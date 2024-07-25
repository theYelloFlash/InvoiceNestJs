import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { FilterQuery, Model } from 'mongoose';
import { Customer, UserDocument } from 'src/dataModels/Schemas/customer.schema';
import { UserService } from '../user/user.service';
import { AuthLoginDto } from 'src/dataModels/DTO/auth.login.dto';
import { User } from 'src/dataModels/Schemas/user.schema';
import { IPayload } from 'src/Shared/Ipayload';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

@Injectable()
export class AuthService {
    constructor(
        private _userServ: UserService,
        private _jwtService: JwtService
    ) { }

    async mailLogin(authLoginDto: AuthLoginDto) {
        const email = authLoginDto.email;
        const password = authLoginDto.password;

        const filterQuery: FilterQuery<User> = {
            $and: [{
                isDeleted: false,
                email: email,
            }]
        }

        const data = await this._userServ.findAll(filterQuery, { skip: 0, limit: 100 });

        const userdata = data.results[0];
        if (userdata) {
            let isPasswordMatch = await bcrypt.compare(password, userdata.password);
            if (isPasswordMatch) {
                const payload: IPayload = {
                    uuid: userdata.uuid,
                    email: userdata.email,
                    firstName: userdata.firstName,
                    lastName: userdata.lastName,
                };
                
                return {
                    access_token: this._jwtService.sign(payload, {secret : process.env.JWT_SECRET_KEY}),
                    payload: payload
                }
            } else {
                throw new HttpException("Invalid Password", HttpStatus.FAILED_DEPENDENCY);
            }
        } else {
            throw new HttpException("Invalid Email", HttpStatus.NOT_FOUND);
        }
    }

    validateToken(token: string) {
        return this._jwtService.verify(token, {
            secret : process.env.JWT_SECRET_KEY
        }) as IPayload;
    }
}
