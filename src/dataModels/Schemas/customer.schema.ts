import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { GenericSchema } from "./generic.schema";
import { ICustomer } from "src/Interface/Dist/ICustomer";
import { ICustomerRequest } from "src/Interface/Requests/ICustomerRequest.request";
import { IsOptional } from "class-validator";

export type UserDocument = Customer & Document;

@Schema()
export class Customer extends GenericSchema implements ICustomerRequest{
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

export const CustomerSchema = SchemaFactory.createForClass(Customer);
