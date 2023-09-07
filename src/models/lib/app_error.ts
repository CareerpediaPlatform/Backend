export default class AppError extends Error {
    additionalInfo?:string
    constructor (message,additionalInfo?){
        super(message)
        this.additionalInfo=additionalInfo
    }
}