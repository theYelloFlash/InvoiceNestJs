import { IInvoiceRequest, ItemDetail } from "src/Interface/Requests/invoice.request";
import { GenericDto } from "./generic.dto";
import { IInvoice } from "src/Interface/Dist/IInvoice";
import { ApiProperty } from "@nestjs/swagger";

export class InvoiceDto extends GenericDto implements IInvoice{

    @ApiProperty()
    customerId: string;
    
    @ApiProperty()
    totalWithutGst: number;

    @ApiProperty()
    totalGstAmount: number;

    @ApiProperty()
    userName: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    billingTo: string;

    @ApiProperty()
    invoiceDate: Date;

    @ApiProperty()
    dueDate: Date;

    @ApiProperty()
    subTotal: number;

    @ApiProperty()
    itemDetails: ItemDetail[];

    @ApiProperty()
    product : string;
}