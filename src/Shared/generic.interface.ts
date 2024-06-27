export interface IGenericInterface {
    created_date: Date;
    created_user:string;
    isDeleted?:boolean;
    uuid:string;
    modified_user?:string;
    modified_date?: Date;
    deleted_date?: Date;
    deleted_user?: string;
}