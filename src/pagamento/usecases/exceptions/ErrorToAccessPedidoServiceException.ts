import { ExternalExceptionsHandler } from "@nestjs/core/exceptions/external-exceptions-handler";


export class ErrorToAccessPedidoServiceException extends ExternalExceptionsHandler {
    public readonly code = "sgr.errorToAccessPedidoService";
    public readonly message = "Erro ao acessar pedido service";
    public readonly httpStatus = 500;
}