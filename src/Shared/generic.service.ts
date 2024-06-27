import { GenericSchema } from "src/dataModels/Schemas/generic.schema";
import { IGenericInterface } from "./generic.interface";
import { Model, UpdateQuery } from "mongoose";
import { PaginationParams } from "src/dataModels/DTO/pagination.params.dto";
import { PaginatedDto } from "src/dataModels/DTO/paginated.dto";

export class GenericService<T extends IGenericInterface, Q extends GenericSchema> {
    constructor(private _model: Model<GenericSchema | Q>) { }

    async create(createDto: Partial<GenericSchema | T>): Promise<GenericSchema> {
        createDto.created_date = new Date();
        console.log(createDto)
        const created = new this._model(createDto);
        return created.save()
    }

    async createMany(createDto: Partial<GenericSchema | T>[]) {
        try {
            const created = await this._model.insertMany(createDto);
            return created;
        } catch (error) {
            // Handle any errors that might occur during the creation process
            throw new Error('Error creating documents: ' + error.message);
        }
    }

    async findAll(
        // eslint-disable-next-line @typescript-eslint/ban-types
        searchQuery: Object,
        { skip, limit }: PaginationParams,
        populate?: any
    ): Promise<PaginatedDto<Q>> {
        let query = this._model
            .find(searchQuery)
            .sort({ created_date: -1 })
            .skip(Number(skip))
            .populate(populate);
        if (limit) {
            query = query.limit(Number(limit));
        }
        let totalQueryCount = this._model.countDocuments(searchQuery).exec();;

        //const count = await this._model.count();
        const data = await query;
        return {
            total: await totalQueryCount,
            limit: Number(limit),
            skip: Number(skip),
            length: data.length,
            results: data as Array<Q>,
        };
    }

    async findOne(query: Object, populate?: any): Promise<Q> {
        return this._model.findOne(query).populate(populate).exec() as Promise<Q>;
    }

    async update(
        // eslint-disable-next-line @typescript-eslint/ban-types
        query: Object,
        updateDto: Partial<T>,
        customUpdateDto?: any,
        values?: any
    ): Promise<Q> {
        let value: UpdateQuery<GenericSchema | Q>;
        if (customUpdateDto) {
            value = customUpdateDto;
        } else {
            value = {
                $set: updateDto,
                modified_date: new Date(),
                // modified_user: req.user.uuid
            };
        }
        if (!values) {
            return this._model
                .findOneAndUpdate(query, value, {
                    new: true,
                })
                .exec() as Promise<Q>;
        } else {
            return this._model
                .updateMany(query, values, {
                    new: true,
                })
                .exec() as unknown as Promise<Q>;
        }
    }

    async delete(query: Object, deleted_user: string): Promise<Q> {
        // return this._model.findOneAndDelete({ uuid: uuid }).exec() as Promise<Q>;
        const value: UpdateQuery<GenericSchema | Q> = {
            isDeleted: true,
            deleted_date: new Date(),
            deleted_user: deleted_user,
        };
        return this._model
            .findOneAndUpdate(query, value, { new: true })
            .exec() as Promise<Q>;
    }
}