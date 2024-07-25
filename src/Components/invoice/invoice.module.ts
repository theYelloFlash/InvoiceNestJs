import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Invoice, InvoiceSchema } from 'src/dataModels/Schemas/invoiceSchema';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { AuthService } from '../auth/auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports : [
        MongooseModule.forFeature([
            {
                name : Invoice.name,
                schema : InvoiceSchema
            }
        ]), UserModule, JwtModule
    ],
    controllers : [InvoiceController],
    providers : [InvoiceService, AuthService],
    exports : [InvoiceService]
})
export class InvoiceModule {}
