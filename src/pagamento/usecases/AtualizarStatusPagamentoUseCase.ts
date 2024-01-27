import { StatusPagamento } from "../types";
import { PagamentoDto } from "../dtos";
import { BadRequestException, Logger } from "@nestjs/common";
import { IAtualizarStatusPagamentoUseCase, IPagamentoRepositoryGateway } from "../interfaces";

export class AtualizarStatusPagamentoUseCase implements IAtualizarStatusPagamentoUseCase {
    constructor(
        private pagamentoRepositoryGateway: IPagamentoRepositoryGateway,
        private logger: Logger) {
    }
    
    async atualizarStatus(pedidoId: number, codigoPagamento: string, status: StatusPagamento): Promise<void> {
        this.logger.log("Start id={}", pedidoId);
        const pagamento: PagamentoDto = await this.pagamentoRepositoryGateway.obterPorPedidoIdECodigoPagamento(pedidoId, codigoPagamento);
        if (!pagamento) {
            throw new BadRequestException("Pedido não encontrado");
        }
        const pagamentoDto = pagamento;
        pagamentoDto.status = status;
        await this.pagamentoRepositoryGateway.atualizarStatus(pagamentoDto);
    }
}