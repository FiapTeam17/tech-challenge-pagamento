import { PagamentoDto } from "../dtos";

export const IObterPagamentoUseCase: unique symbol = Symbol("IObterPagamentoUseCase");

export interface IObterPagamentoUseCase {
    obtemPagamentoPorPedidoId(pedidoId: number): Promise<PagamentoDto[]>;
}