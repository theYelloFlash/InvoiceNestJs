import { IPaymentRequest } from "src/Interface/Requests/IPayment.request";
import { GenericSchema } from "./generic.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class Payment extends GenericSchema implements IPaymentRequest{

    @Prop()
    customerId: string;

    @Prop()
    customer: string;

    @Prop()
    paymentDate: Date;

    @Prop()
    amount: number;

    @Prop()
    amountInBank: number;

    @Prop()
    bankCharges: number;

    @Prop()
    reffNum: string;

    @Prop()
    description: string;

    @Prop()
    document: string;
    
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);