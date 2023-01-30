import { ITransactionRequestConfig } from "../interfaces";

export const merge = (...obj: ITransactionRequestConfig[]) => {
    return Object.assign({}, ...obj);
};