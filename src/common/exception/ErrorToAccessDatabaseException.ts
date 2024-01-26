import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";

export class ErrorToAccessDatabaseException extends ExceptionsHandler {
    public readonly code = "sgr.errorToAccessException";
    public readonly message = "Erro ao acessar o banco de dados";
    public readonly httpStatus = 500;
}