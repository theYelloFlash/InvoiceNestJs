import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InvoiceService } from './invoice.service';
import { InvoiceDto } from 'src/dataModels/DTO/Invoice.dto';
import { Invoice } from 'src/dataModels/Schemas/invoiceSchema';
import { GenericSchema } from 'src/dataModels/Schemas/generic.schema';
import { PaginationParams } from 'src/dataModels/DTO/pagination.params.dto';
import { FilterQuery } from 'mongoose';
import { Response } from 'express';
import { ExpressJWTRequest } from '../auth/IExpressJwt.request';
import { AuthGuard } from '../auth/auth.gaurd';


@Controller('api/invoice')
@ApiTags('api/invoice')
export class InvoiceController {

    constructor(private _invoiceServ: InvoiceService) { }

    @Post()
    @UseGuards(AuthGuard)
    async create(@Req() req: ExpressJWTRequest, @Body() createdDto: InvoiceDto): Promise<GenericSchema | Invoice> {
        console.log(req.user.tokenDetails.uuid);
        createdDto.created_date = new Date();
        createdDto.created_user = req.user.tokenDetails.uuid;
        return await this._invoiceServ.create(createdDto);
    }

    @Get(':uuid')
    async findOne(@Param('uuid') uuid: string): Promise<Invoice> {
        return await this._invoiceServ.findOne({ uuid: uuid });
    }

    @Put(':uuid')
    async findAndUpdate(@Body() invoiceDto: Partial<InvoiceDto>, @Param('uuid') uuid: String) {
        const data = await this._invoiceServ.update({ uuid: uuid }, invoiceDto);
        console.log(data);
        return data;
    }

    @Get()
    @UseGuards(AuthGuard)
    async findAllByUser( @Req() req : ExpressJWTRequest, @Query() { skip, limit }: PaginationParams) {
        const query: FilterQuery<InvoiceDto> = {
            isDeleted: false,
            created_user : req.user.tokenDetails.uuid
        }

        return await this._invoiceServ.findAll(query, { skip, limit });
    }

    @Delete(':uuid')
    async deleteInvoice(@Param('uuid') uuid: string): Promise<Invoice> {
        return await this._invoiceServ.delete({ uuid: uuid, isDeleted: false }, uuid);
    }


    @Post('createPdf')
    async getPdf(@Res() res: Response, @Body() createDto: Invoice) {
        console.log("dsadsa")


        const pdfBuffer = await this._invoiceServ.generatePdf(createDto);
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=invoice.pdf',
            'Content-Length': pdfBuffer.length,
        });

        res.end(pdfBuffer);
        // const filepath = path.join(downloadDir, `invoice_${Date.now()}.pdf`)
        // fs.writeFileSync(filepath,pdfBuffer);

        // res.json({ filepath });
    }
}
