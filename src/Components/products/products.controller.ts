import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from 'src/dataModels/DTO/product.dto';
import { GenericSchema } from 'src/dataModels/Schemas/generic.schema';
import { Product } from 'src/dataModels/Schemas/product.schema';
import { PaginationParams } from 'src/dataModels/DTO/pagination.params.dto';
import { FilterQuery } from 'mongoose';
import { query } from 'express';
import { AuthGuard } from '../auth/auth.gaurd';
import { ExpressJWTRequest } from '../auth/IExpressJwt.request';

@Controller('api/products')
export class ProductsController {
    constructor(private  _productServ : ProductsService){

    }

    @Post()
    @UseGuards(AuthGuard)
    async create( @Req() req : ExpressJWTRequest, @Body() createDto : ProductDto) : Promise<GenericSchema | Product> {
        console.log(createDto)
        createDto.created_date = new Date();
        createDto.created_user = req.user.tokenDetails.uuid;
        return await this._productServ.create(createDto);
    }

    @Get(':uuid')
    async findOne(@Param('uuid') uuid : string) : Promise<Product> {
        return await this._productServ.findOne({isDeleted : false,uuid : uuid});
    }

    @Get()
    @UseGuards(AuthGuard)
    async findAllByUser( @Req() req : ExpressJWTRequest, @Query() {skip, limit} : PaginationParams, @Param('userId') userId : string){
        const query : FilterQuery<ProductDto> = {
            isDeleted : false,
            created_user : req.user.tokenDetails.uuid,
        }

        return await this._productServ.findAll(query, {skip, limit});
    }

    @Put(':uuid')
    async updateOne(@Param('uuid') uuid : string, @Body() updateDto : Partial<ProductDto>){
        return await this._productServ.update({uuid : uuid}, updateDto)
    }

    @Delete(':uuid')
    async deleteInvoice(@Param('uuid') uuid : string) : Promise<Product> {
        return await this._productServ.delete({uuid : uuid, isDeleted : false}, uuid);
    }
}
