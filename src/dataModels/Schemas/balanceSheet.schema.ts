import { IPaymentRequest } from "src/Interface/Requests/IPayment.request";
import { GenericSchema } from "./generic.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IBalanceSheetRequest } from "src/Interface/Requests/IBalanceSheetRequest.request";


@Schema()
export class BalanceSheet extends GenericSchema implements IBalanceSheetRequest{
    @Prop()
    date: Date;

    @Prop()
    IsInvoice: boolean;

    @Prop()
    IsPayment: boolean;

    @Prop()
    debitAmount: number;

    @Prop()
    creditAmount: number;

    @Prop()
    customerId : string;
    
}

export const BalanceSheeetSchema = SchemaFactory.createForClass(BalanceSheet);