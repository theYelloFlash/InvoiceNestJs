import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { User, UserSchema } from 'src/dataModels/Schemas/user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: User.name,
            schema: UserSchema
        }])
    ],
    providers : [UserService],
    controllers : [UserController],
    exports : [UserService]
})
export class UserModule { }
