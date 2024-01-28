import { StatusPagamento } from "../types";

export class PagamentoEntity {

    constructor(
        readonly id?: number,
        private pedido?: number,
        private status?: StatusPagamento,
        private qrcode?: string
    ) {
    }

    static mapStatus(statusPagamento: string): StatusPagamento {
        switch (statusPagamento) {
            case "cancelled":
                return StatusPagamento.CANCELADO;
            case "refunded":
                return StatusPagamento.CANCELADO;
            case "charged_back":
                return StatusPagamento.CANCELADO;
            case "approved":
                return StatusPagamento.PAGO;
            case "rejected":
                return StatusPagamento.REJEITADO;
            default:
                return StatusPagamento.PENDENTE;
        }
    }
}