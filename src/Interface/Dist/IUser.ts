import { IGenericInterface } from "src/Shared/generic.interface";
import { IUserRequest } from "../Requests/IUserrequest.request";

export interface IUser extends IGenericInterface, IUserRequest{}