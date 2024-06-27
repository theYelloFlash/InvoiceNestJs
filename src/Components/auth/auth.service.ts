import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/dataModels/Schemas/user.schema';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {

    }

    async register(username: string, password: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new this.userModel({ username, password: hashedPassword });
        return newUser.save();
    }

    // async validateUser(username: string, password: string): Promise<User> {
    //     const user = await this.userModel.findOne({ username });
    //     if (user && await bcrypt.compare(password, user.password)) {
    //         return user;
    //     }
    //     return null;
    // }
}
