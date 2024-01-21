import { StatusPagamento } from "../types/StatusPagamento";
import { PedidoNotFoundException } from "./exceptions/PedidoNotFoundException";
import { PagamentoDto } from "../dtos/PagamentoDto";
import { Logger } from "@nestjs/common";
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
            this.logger.warn("Pedido id={} não encontrado", pedidoId);
            throw new PedidoNotFoundException();
        }
        const pagamentoDto = pagamento;
        pagamentoDto.status = status;
        await this.pagamentoRepositoryGateway.atualizarStatus(pagamentoDto);
        this.logger.log("End");
    }
}