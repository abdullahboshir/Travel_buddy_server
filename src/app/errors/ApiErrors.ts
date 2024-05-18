export class ApiErrors extends Error {
    success: boolean;
    statusCode: number;
    errorDetails: string;
    constructor (success: boolean, statusCode: number, message: string, errorDetails = ''){
        super(message)
        this.success = success;
        this.statusCode = statusCode;
        this.errorDetails = errorDetails

        if(errorDetails) {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}