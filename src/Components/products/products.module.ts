import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/dataModels/Schemas/product.schema';
import { ProductsController } from './products.controller';

@Module({
  imports : [
    MongooseModule.forFeature([
      {
        name : Product.name,
        schema : ProductSchema
      }
    ])
  ],
  providers: [ProductsService],
  controllers : [ProductsController],
  exports : [ProductsService]
})
export class ProductsModule {}
