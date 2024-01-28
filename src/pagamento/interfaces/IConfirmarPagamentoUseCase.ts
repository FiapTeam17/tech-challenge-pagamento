import { PagamentoDto } from "../dtos";

export const IConfirmarPagamentoUseCase: unique symbol = Symbol("IConfirmarPagamentoUseCase");

export interface IConfirmarPagamentoUseCase {
    confirmar(codigoPagamento: string, statusPagamento: string): Promise<PagamentoDto>;

    confirmarPagamentoMercadoPago(codigoPagamento: string): Promise<PagamentoDto>;
}