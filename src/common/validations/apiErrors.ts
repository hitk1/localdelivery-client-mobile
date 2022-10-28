export class ApiCommomError {
    readonly message: string
    readonly errorCode: string

    constructor(
        error: string,
        errorCode: string
    ) {
        this.errorCode = errorCode
        this.message = error
    }
}