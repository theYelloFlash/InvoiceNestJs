import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { GenericSchema } from "./generic.schema";
import { IInvoiceRequest, ItemDetail } from "src/Interface/Requests/invoice.request";



@Schema()
export class Invoice extends GenericSchema implements IInvoiceRequest{

    @Prop()
    customerId: string;
    
    @Prop()
    totalWithutGst: number;

    @Prop()
    totalGstAmount: number;
    
    @Prop()
    product: string;

    @Prop()
    userName : string

    @Prop()
    description : string

    @Prop()
    billingTo : string

    @Prop()
    invoiceDate : Date

    @Prop()
    dueDate : Date

    @Prop({type : Object})
    itemDetails : ItemDetail[]
    
    @Prop()
    subTotal : number
}

// export type InvoiceDocument = Invoice & Document;
export const InvoiceSchema = SchemaFactory.createForClass(Invoice);

