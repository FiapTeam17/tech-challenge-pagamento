import { PagamentoDto } from "../dtos";

export const IConfirmarPagamentoUseCase: unique symbol = Symbol("IConfirmarPagamentoUseCase");

export interface IConfirmarPagamentoUseCase {
    confirmar(identificador: string, statusPagamento: string): Promise<PagamentoDto>;

    confirmarPagamentoMercadoPago(codigoPagamento: string): Promise<PagamentoDto>;
}