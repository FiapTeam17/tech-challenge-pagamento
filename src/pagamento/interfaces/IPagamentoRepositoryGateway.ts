import { PagamentoDto } from "../dtos";

export const IPagamentoRepositoryGateway: unique symbol = Symbol("IPagamentoRepositoryGateway");

export interface IPagamentoRepositoryGateway {
    salvar(dto: PagamentoDto): Promise<PagamentoDto>;
    atualizarStatus(pagamento: PagamentoDto): Promise<void>;
    obterPorCodigoPagamento(codigoPagamento: string): Promise<PagamentoDto>;
    obterPorIdentificador(identificador: number): Promise<PagamentoDto>;
}