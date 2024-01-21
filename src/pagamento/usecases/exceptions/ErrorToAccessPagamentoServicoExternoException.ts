import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";

export class ErrorToAccessPagamentoServicoExternoException extends ExceptionsHandler {
    public readonly code = "sgr.erroAoAcessarSistemaPagamentoExterno";
    public readonly message = "Erro ao acessar sistema de pagamento externo";
    public readonly httpStatus = 500;
}