export interface IInvoiceRequest {
    userName: string
    customerId : string
    description: string
    billingTo: string
    invoiceDate: Date
    dueDate: Date
    subTotal: number
    itemDetails: ItemDetail[]
    product : string;
    totalGstAmount : number;
    totalWithutGst : number;
}

export interface ItemDetail{
    itemDetails : string;
    unitCost : number;
    quantity : number;
    amount : number;
    gstPercentage : number;
    itemDescription : string;
}