import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/dataModels/Schemas/product.schema';
import { ProductsController } from './products.controller';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { UserModule } from '../user/user.module';

@Module({
  imports : [
    MongooseModule.forFeature([
      {
        name : Product.name,
        schema : ProductSchema
      }
    ]), UserModule
  ],
  providers: [ProductsService, AuthService ,JwtService],
  controllers : [ProductsController],
  exports : [ProductsService]
})
export class ProductsModule {}
