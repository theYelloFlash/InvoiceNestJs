import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './Components/auth/auth.module';
import { InvoiceModule } from './Components/invoice/invoice.module';
import { ProductsController } from './Components/products/products.controller';
import { ProductsModule } from './Components/products/products.module';
import { UsersController } from './Components/users/users.controller';
import { UsersService } from './Components/users/users.service';
import { UsersModule } from './Components/users/users.module';
import { MulterModule } from '@nestjs/platform-express';
import { GridFsMulterConfigService } from './Services/gridFsMulterConfigService.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://spundan:9-XHahHq9%40-THDf@spundandev.hp3dz.mongodb.net/AkshaysDev?authSource=admin&replicaSet=atlas-5ohmqb-shard-0&readPreference=primary&ssl=true'),
    MulterModule.registerAsync({
      useClass: GridFsMulterConfigService,
    }),
    AuthModule,
    InvoiceModule,
    ProductsModule,
    UsersModule
  ],
  controllers: [AppController, ProductsController, UsersController],
  providers: [AppService],
})
export class AppModule {}
