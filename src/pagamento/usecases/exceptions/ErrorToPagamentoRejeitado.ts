
export class ErrorToPagamentoRejeitado  {
    public readonly code = "sgr.erroPagamentoRejeitado";
    public readonly message = "Pagamento foi rejeitado pelo sistema externo";
    public readonly httpStatus = 500;
}