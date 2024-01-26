import { PagamentoDto } from "../dtos";
import { CriacaoPagamentoMockMpDto } from "../dtos/CriacaoPagamentoMpDto";

export const ICriarPagamentoUseCase: unique symbol = Symbol("ICriarPagamentoUseCase");

export interface ICriarPagamentoUseCase {
    criar(criacaoPagamentoMockMpDto: CriacaoPagamentoMockMpDto): Promise<PagamentoDto>;
}