import { PagamentoDto } from "../dtos";
import { CriacaoPagamentoDto } from "../dtos/CriacaoPagamentoDto";

export const ICriarPagamentoUseCase: unique symbol = Symbol("ICriarPagamentoUseCase");

export interface ICriarPagamentoUseCase {
    criar(criacaoPagamentoMockMpDto: CriacaoPagamentoDto): Promise<PagamentoDto>;
}