import { CriacaoPagamentoDto, PagamentoDto } from "../dtos";

export const ICriarPagamentoUseCase: unique symbol = Symbol("ICriarPagamentoUseCase");

export interface ICriarPagamentoUseCase {
    criar(criacaoPagamentoMockMpDto: CriacaoPagamentoDto): Promise<PagamentoDto>;
}