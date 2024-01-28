import { StatusPagamento } from "../types";

export class PagamentoDto {
    constructor(
        public id?: number,
        public identificador?: number,
        public status?: StatusPagamento,
        public urlCallback?: string,
        public codigoPagamento?: string,
        public qrCode?: string
    ) {
    }
}