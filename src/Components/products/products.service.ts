import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericService } from 'src/Shared/generic.service';
import { ProductDto } from 'src/dataModels/DTO/product.dto';
import { Product } from 'src/dataModels/Schemas/product.schema';

@Injectable()
export class ProductsService extends GenericService<ProductDto, Product> {
    constructor(@InjectModel(Product.name) private productModel : Model<Product>){
        super(productModel);
    }
}
