import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { createDeflate } from 'zlib';
import { UserDto } from 'src/dataModels/DTO/users.dto';
import { User } from 'src/dataModels/Schemas/user.schema';
import { GenericSchema } from 'src/dataModels/Schemas/generic.schema';
import { PaginationParams } from 'src/dataModels/DTO/pagination.params.dto';
import { FilterQuery } from 'mongoose';
import { v4 } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';
import { GridFSBucket, MongoClient } from 'mongodb';
import { Response, query } from 'express';


@Controller('api/users')
export class UsersController {
    constructor(private _userServ: UsersService) { }

    @Post()
    async create(@Body() createDto: UserDto): Promise<GenericSchema | User> {
        const commonUserID = v4()
        createDto.uuid = commonUserID
        createDto.created_user = commonUserID
        return await this._userServ.create(createDto);
    }

    @Get(':uuid')
    async findOne(@Param('uuid') uuid: string): Promise<User> {
        return await this._userServ.findOne({ isDeleted: false, uuid: uuid });
    }

    @Get()
    async findAllByUser(@Query() { skip, limit }: PaginationParams, @Param('userId') userId: string) {
        const query: FilterQuery<UserDto> = {
            isDeleted: false,
        }

        return await this._userServ.findAll(query, { skip, limit });
    }

    @Delete(':uuid')
    async deleteInvoice(@Param('uuid') uuid: string): Promise<User> {
        return await this._userServ.delete({ uuid: uuid, isDeleted: false }, uuid);
    }

    @Post('uploadImage')
    @UseInterceptors(FileInterceptor('image'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        return {
            message: 'File uploaded successfully',
            fileUrl: `http://localhost:3000/api/upload/${file.filename}`,
        };
    }

    @Put(':uuid')
    async findAndAndUpdate(@Param('uuid') uuid : string, @Body() userDto : Partial<UserDto>){
      return await this._userServ.update({uuid : uuid},userDto);
    }

    @Get(':filename')
    async getFile(@Param('filename') filename: string, @Res() res: Response) {
      const client = new MongoClient('mongodb://localhost/nest');
      await client.connect();
      const database = client.db('nest');
      const bucket = new GridFSBucket(database, { bucketName: 'uploads' });
      const downloadStream = bucket.openDownloadStreamByName(filename);
  
      downloadStream.on('data', (chunk) => {
        res.write(chunk);
      });
  
      downloadStream.on('error', () => {
        res.sendStatus(404);
      });
  
      downloadStream.on('end', () => {
        res.end();
      });
    }
}
