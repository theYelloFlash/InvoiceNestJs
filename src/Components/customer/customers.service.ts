import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericService } from 'src/Shared/generic.service';
import { CustomerDto } from 'src/dataModels/DTO/customers.dto';
import { Customer } from 'src/dataModels/Schemas/customer.schema';

@Injectable()
export class CustomerService extends GenericService<CustomerDto, Customer> {
    constructor(@InjectModel(Customer.name) private customerModel : Model<Customer>){
        super(customerModel)
    }
}
