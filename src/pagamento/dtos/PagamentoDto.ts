import { StatusPagamento } from "../types";

export class PagamentoDto {
    constructor(
        public id?: string,
        public identificador?: string,
        public dataCriacao?: Date,
        public valor?: number,
        public status?: StatusPagamento,
        public codigoPagamento?: string,
        public qrCode?: string,
    ) {
    }
}
