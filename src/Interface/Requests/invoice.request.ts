export interface IInvoiceRequest {
    userName: string
    description: string
    billingTo: string
    invoiceDate: Date
    dueDate: Date
    subTotal: number
    itemDetails: ItemDetail[]
    product : string;
}

export interface ItemDetail{
    itemDetails : string;
    unitCost : number;
    quantity : number;
    amount : number;
}