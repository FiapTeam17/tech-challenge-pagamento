import { StatusPagamento } from "../types/StatusPagamento";

export class PagamentoDto {
    constructor(
        public id?: number,
        public pedidoId?: number,
        public status?: StatusPagamento,
        public codigoPagamento?: string,
        public qrCode?: string,
    ) {
    }
}