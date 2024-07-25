import { IPayment } from "src/Interface/Dist/IPayment";
import { GenericDto } from "./generic.dto";
import { ApiProperty } from "@nestjs/swagger";
import { isNotEmpty } from "class-validator";

export class PaymentDto extends GenericDto implements IPayment{

   

    @ApiProperty()
    customer: string;

    @ApiProperty()
    paymentDate: Date;
    
    @ApiProperty()
    amount: number;

    @ApiProperty()
    customerId: string;

    @ApiProperty()
    amountInBank: number;

    @ApiProperty()
    bankCharges: number;

    @ApiProperty()
    reffNum: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    document: string;
    
}