import { IUser } from "src/Interface/Dist/IUser";
import { GenericDto } from "./generic.dto";
import { ApiProperty } from "@nestjs/swagger";

export class UserDto extends GenericDto implements IUser {

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