import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './Components/auth/auth.module';
import { InvoiceModule } from './Components/invoice/invoice.module';
import { ProductsController } from './Components/products/products.controller';
import { ProductsModule } from './Components/products/products.module';
import { CustomerController } from './Components/customer/customers.controller';
import { CustomerModule } from './Components/customer/customers.module';
import { MulterModule } from '@nestjs/platform-express';
import { GridFsMulterConfigService } from './Services/gridFsMulterConfigService.service';
import { UserController } from './Components/user/user.controller';
import { UserModule } from './Components/user/user.module';
import { PaymentModule } from './Components/payment/payment.module';
import { BalanceSheetModule } from './Components/balance-sheet/balance-sheet.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://spundan:9-XHahHq9%40-THDf@spundandev.hp3dz.mongodb.net/AkshaysDev?authSource=admin&replicaSet=atlas-5ohmqb-shard-0&readPreference=primary&ssl=true'),
    MulterModule.registerAsync({
      useClass: GridFsMulterConfigService,
    }),
    AuthModule,
    InvoiceModule,
    ProductsModule,
    CustomerModule,
    UserModule,
    PaymentModule,
    BalanceSheetModule
  ],
  controllers: [AppController, ProductsController, CustomerController, UserController],
  providers: [AppService],
})
export class AppModule {}
