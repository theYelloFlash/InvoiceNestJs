import { Prop } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { v4 } from 'uuid';

export abstract class GenericSchema extends Document {
    @Prop({
        required: true,
        type: String,
        default: function genUUID() {
            return v4();
        },
    })
    uuid: string;

    @Prop({
        required: true,
        type: Boolean,
        default: false,
    })
    isDeleted: boolean;

    @Prop({
        required: true,
        type: String,
    })
    created_user: string;

    @Prop()
    modified_user: string;

    @Prop()
    deleted_user: string;

    @Prop({
        required: true,
        type: Date,
        default: new Date(),
    })
    created_date: Date;

    @Prop()
    modified_date: Date;

    @Prop()
    deleted_date: Date;
}