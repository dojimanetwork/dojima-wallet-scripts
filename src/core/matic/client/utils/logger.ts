import { ERROR_TYPE } from "../enums";
import { ErrorHelper } from "./error_helper";

export class Logger {

    private isEnabled: boolean;

    enableLog(value: boolean) {
        this.isEnabled = value ? true : false;
    }

    // @ts-ignore
    log(...message) {
        if (this.isEnabled) {
            console.log(...message);
        }
    }

    // @ts-ignore
    error(type: ERROR_TYPE, info?) {
        return new ErrorHelper(type, info);
    }
}