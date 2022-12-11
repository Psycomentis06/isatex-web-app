import { IUser } from "./IUser";

export interface ICustomer extends IUser {
    city: string
    address: string;
    country: string;
    enterpriseName: string;
    enterpriseAddress: string;
    enterpriseTelephone: string;
}