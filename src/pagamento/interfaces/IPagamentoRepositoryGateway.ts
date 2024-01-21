import { PagamentoDto } from "../dtos";

export const IPagamentoRepositoryGateway: unique symbol = Symbol("IPagamentoRepositoryGateway");

export interface IPagamentoRepositoryGateway {
    salvar(dto: PagamentoDto): Promise<PagamentoDto>;
    atualizarStatus(pagamento: PagamentoDto): Promise<void>;
    atualizarCodigoPagamento(pagamento: PagamentoDto): Promise<void>;
    obterPorId(pagamentoId: number): Promise<PagamentoDto>;
    obterPorPedidoId(pedidoId: number): Promise<PagamentoDto[]>;
    obterPorPedidoIdECodigoPagamento(pedidoId: number, codigoPagamento: string): Promise<PagamentoDto>;
    obterPorCodigoPagamento(codigoPagamento: string): Promise<PagamentoDto>;
}