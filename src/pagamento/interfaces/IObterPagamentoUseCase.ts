import { PagamentoDto } from "../dtos";

export const IObterPedidoUseCase: unique symbol = Symbol('IObterPagamentoUseCase');

export interface IObterPagamentoUseCase {
    obterPagamentos(): Promise<PagamentoDto[]>;
}
