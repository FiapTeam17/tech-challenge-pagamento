import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";


export class CamposObrigatoriosNaoPreechidoException extends ExceptionsHandler {
    public readonly code = "sgr.camposObrigatoriosNaoPreenchido";
    public readonly httpStatus = 400;

    constructor(public readonly message: string){
        super();
    }
}