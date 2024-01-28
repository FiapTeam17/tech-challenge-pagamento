import { StatusPagamento } from "../types";

export class PagamentoDto {
    constructor(
        public id?: string,
        public identificador?: string,
        public status?: StatusPagamento,
        public urlCallback?: string,
        public codigoPagamento?: string,
        public qrCode?: string
    ) {
    }
}