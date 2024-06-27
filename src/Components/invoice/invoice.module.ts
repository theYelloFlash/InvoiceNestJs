import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { Invoice, InvoiceSchema } from 'src/dataModels/Schemas/invoiceSchema';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';

@Module({
    imports : [
        MongooseModule.forFeature([
            {
                name : Invoice.name,
                schema : InvoiceSchema
            }
        ])
    ],
    controllers : [InvoiceController],
    providers : [InvoiceService],
    exports : [InvoiceService]
})
export class InvoiceModule {}
