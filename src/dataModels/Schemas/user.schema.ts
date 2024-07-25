import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { GenericSchema } from "./generic.schema";
import { IGenericInterface } from "src/Shared/generic.interface";
import { IUserrequest } from "src/Interface/Requests/IUser.request";

@Schema()
export class User extends GenericSchema implements IUserrequest{

    @Prop({required : true})
    firstName?: string;

    lastName?: string;
    
    @Prop({required : true})
    email: string;

    @Prop({required : true})
    phoneNumber: string;

    @Prop({required : true})
    password: string;
    
}

export const UserSchema = SchemaFactory.createForClass(User);
