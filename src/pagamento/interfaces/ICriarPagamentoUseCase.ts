import { PagamentoDto } from "../dtos";

export const ICriarPagamentoUseCase: unique symbol = Symbol("ICriarPagamentoUseCase");

export interface ICriarPagamentoUseCase {
    criar(pagamentoDto: PagamentoDto): Promise<PagamentoDto>;
}