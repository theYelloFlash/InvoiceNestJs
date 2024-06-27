import { IProduct } from "src/Interface/Dist/IProduts";
import { GenericDto } from "./generic.dto";
import { ApiProperty } from "@nestjs/swagger";

export class ProductDto extends GenericDto implements IProduct{
    
    @ApiProperty()
    gstPercentage: number;
    
    @ApiProperty()
    productname: string;

    @ApiProperty()
    productDescription: string;

    @ApiProperty()
    price: number;
    
}