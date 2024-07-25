import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { BalanceSheetService } from './balance-sheet.service';
import { ExpressJWTRequest } from '../auth/IExpressJwt.request';
import { BalanceSheetDto } from 'src/dataModels/DTO/balanceSheet.dto';
import { GenericSchema } from 'src/dataModels/Schemas/generic.schema';
import { BalanceSheet } from 'src/dataModels/Schemas/balanceSheet.schema';
import { AuthGuard } from '../auth/auth.gaurd';
import { ApiTags } from '@nestjs/swagger';
import { FilterQuery } from 'mongoose';
import { PaymentService } from '../payment/payment.service';
import { InvoiceService } from '../invoice/invoice.service';
import { Payment } from 'src/dataModels/Schemas/payment.schema';
import { Invoice } from 'src/dataModels/Schemas/invoiceSchema';

@Controller('api/balance-sheet')
@ApiTags('api/balance-sheet')
export class BalanceSheetController {
    constructor(private _balanceSheetServ: BalanceSheetService, private _paymentServ: PaymentService, private _invoiceServ: InvoiceService) { }

    @Post()
    @UseGuards(AuthGuard)

    @Get('byCustomer/:customerId')
    @UseGuards(AuthGuard)
    async getAllEntriesOfCustomer(@Req() req: ExpressJWTRequest, @Param(':customerID') customerId: string): Promise<any> {
        const query: FilterQuery<Invoice> = {
            isDeleted: false,
            customerId: customerId,
            created_user: req.user.tokenDetails.uuid
        }
        var invoiceData = await this._invoiceServ.findAll(query, { skip: 0, limit: 30 });
        var paymentData = await this._paymentServ.findAll(query, { skip: 0, limit: 30 });

        let jointArray: any = [...invoiceData.results, ...paymentData.results];
        let balanceSheetArray = [];

        jointArray.map((item) => {
            if (item.invoiceDate) {
                balanceSheetArray.push({
                    date: item.invoiceDate,
                    IsInvoice: true,
                    customerId: customerId,
                    IsPayment: false,
                    debitAmount: item.subTotal,
                    creditAmount: 0,
                })
            } else {
                balanceSheetArray.push({
                    date: item.paymentDate,
                    IsInvoice: false,
                    customerId: customerId,
                    IsPayment: true,
                    debitAmount: 0,
                    creditAmount: item.amount,
                })
            }
        })

        console.log(balanceSheetArray);
        return balanceSheetArray
    }
}
