import { Body, Controller, Get, Param, Post, Query,Delete, Req, UseGuards, Put } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ApiTags } from '@nestjs/swagger';
import { ExpressJWTRequest } from '../auth/IExpressJwt.request';
import { PaymentDto } from 'src/dataModels/DTO/payment.dto';
import { GenericSchema } from 'src/dataModels/Schemas/generic.schema';
import { PaginationParams } from 'src/dataModels/DTO/pagination.params.dto';
import { FilterQuery } from 'mongoose';
import { Payment } from 'src/dataModels/Schemas/payment.schema';
import { AuthGuard } from '../auth/auth.gaurd';

@Controller('api/payment')
@ApiTags('api/payment')
export class PaymentController {
    constructor(private _paymentServ : PaymentService){}

    @Post()
    @UseGuards(AuthGuard)
    async create(@Req() req : ExpressJWTRequest, @Body() paymentDto : PaymentDto) : Promise<GenericSchema | Payment> {
        paymentDto.created_user = req.user.tokenDetails.uuid;
        return  await this._paymentServ.create(paymentDto);
    }

    @Get()
    @UseGuards(AuthGuard)
    async getAll(@Req() req : ExpressJWTRequest, @Query() {skip, limit} : PaginationParams){
        const query: FilterQuery<PaymentDto> = {
            isDeleted: false,
            created_user : req.user.tokenDetails.uuid
        }
        return await this._paymentServ.findAll(query, { skip, limit });
    }

    @Delete(':uuid')
    async deleteInvoice(@Param('uuid') uuid: string): Promise<Payment> {
        return await this._paymentServ.delete({ uuid: uuid, isDeleted: false }, uuid);
    }

    @Put(':uuid')
    async findAndUpdate(@Body() invoiceDto: Partial<PaymentDto>, @Param('uuid') uuid: String) {
        const data = await this._paymentServ.update({ uuid: uuid }, invoiceDto);
        console.log(data);
        return data;
    }
}
