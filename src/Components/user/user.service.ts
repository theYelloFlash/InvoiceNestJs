import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericService } from 'src/Shared/generic.service';
import { UserDto } from 'src/dataModels/DTO/users.dto';
import { User } from 'src/dataModels/Schemas/user.schema';

@Injectable()
export class UserService extends GenericService<UserDto,User> {
    constructor(@InjectModel(User.name) private userModel : Model<User>){
        super(userModel);
    }
}
