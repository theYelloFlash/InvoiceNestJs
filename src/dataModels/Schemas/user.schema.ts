import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { GenericSchema } from "./generic.schema";
import { IUser } from "src/Interface/Dist/IUser";
import { IUserRequest } from "src/Interface/Requests/IUserrequest.request";
import { IsOptional } from "class-validator";

export type UserDocument = User & Document;

@Schema()
export class User extends GenericSchema implements IUserRequest{
    @Prop({required : true})
    firstName: string;

    @Prop()
    lastName: string;
    
    @Prop({required : true})
    phoneNo: string;

    @Prop({required : true})
    email: string;

    @Prop({required : true})
    city: string;

    @Prop({required : true})
    state: string;

    @Prop({required : true})
    country: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
