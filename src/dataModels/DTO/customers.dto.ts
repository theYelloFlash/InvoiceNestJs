import { ICustomer } from "src/Interface/Dist/ICustomer";
import { GenericDto } from "./generic.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CustomerDto extends GenericDto implements ICustomer {

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    phoneNo: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    city: string;

    @ApiProperty()
    state: string;
    
    @ApiProperty()
    country: string;
    
}