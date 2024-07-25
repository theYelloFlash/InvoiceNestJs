import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CustomerService } from './customers.service';
import { createDeflate } from 'zlib';
import { CustomerDto } from 'src/dataModels/DTO/customers.dto';
import { Customer } from 'src/dataModels/Schemas/customer.schema';
import { GenericSchema } from 'src/dataModels/Schemas/generic.schema';
import { PaginationParams } from 'src/dataModels/DTO/pagination.params.dto';
import { FilterQuery } from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { GridFSBucket, MongoClient } from 'mongodb';
import { Response, query } from 'express';
import { AuthGuard } from '../auth/auth.gaurd';
import { ExpressJWTRequest } from '../auth/IExpressJwt.request';


@Controller('api/users')
export class CustomerController {
    constructor(private _customerServ: CustomerService) { }

    @Post()
    @UseGuards(AuthGuard)
    async create( @Req() req : ExpressJWTRequest, @Body() createDto: CustomerDto): Promise<GenericSchema | Customer> {
        createDto.created_user = req.user.tokenDetails.uuid;
        return await this._customerServ.create(createDto);
    }

    @Get(':uuid')
    async findOne(@Param('uuid') uuid: string): Promise<Customer> {
        return await this._customerServ.findOne({ isDeleted: false, uuid: uuid });
    }

    @Get()
    @UseGuards(AuthGuard)
    async findAllByUser(@Req() req : ExpressJWTRequest, @Query() { skip, limit }: PaginationParams, @Param('userId') userId: string) {
        const query: FilterQuery<CustomerDto> = {
            isDeleted: false,
            created_user  : req.user.tokenDetails.uuid
        }

        return await this._customerServ.findAll(query, { skip, limit });
    }

    @Delete(':uuid')
    async deleteInvoice(@Param('uuid') uuid: string): Promise<Customer> {
        return await this._customerServ.delete({ uuid: uuid, isDeleted: false }, uuid);
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
    async findAndAndUpdate(@Param('uuid') uuid : string, @Body() userDto : Partial<CustomerDto>){
      return await this._customerServ.update({uuid : uuid},userDto);
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
