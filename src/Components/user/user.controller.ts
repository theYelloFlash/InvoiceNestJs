import { Body, Controller, Post, createParamDecorator } from '@nestjs/common';
import { UserService } from './user.service';
import { createDeflate } from 'zlib';
import { UserDto } from 'src/dataModels/DTO/users.dto';
import { GenericSchema } from 'src/dataModels/Schemas/generic.schema';
import { v4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Controller('auth/user')
export class UserController {
    constructor(private _userServ : UserService){}

    @Post()
    async create(@Body() userDto : UserDto) : Promise<GenericSchema> {
        const hashedPassword = await bcrypt.hash(userDto.password,12);
        userDto.password = hashedPassword;
        userDto.uuid = v4();
        userDto.created_user = userDto.uuid;
        return this._userServ.create(userDto);
    }
}
