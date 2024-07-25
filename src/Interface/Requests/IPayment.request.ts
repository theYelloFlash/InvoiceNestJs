export interface IPaymentRequest {
    customerId : string;
    customer : string;
    paymentDate : Date;
    amount : number;
    amountInBank : number;
    bankCharges : number;
    reffNum : string;
    description : string;
    document : string;
}