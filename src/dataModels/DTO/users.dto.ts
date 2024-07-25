import { IUser } from "src/Interface/Dist/IUser";
import { GenericDto } from "./generic.dto";
import { ApiProperty } from "@nestjs/swagger";

export class UserDto extends GenericDto implements IUser{
    @ApiProperty()
    firstName?: string;

    @ApiProperty()
    lastName?: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    phoneNumber: string;

    @ApiProperty()
    password: string;
    
}