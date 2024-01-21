import { Logger } from "@nestjs/common";
import { PagamentoDto } from "../dtos";
import { IObterPagamentoUseCase, IPagamentoRepositoryGateway } from "../interfaces";

export class ObterPagamentoUseCase implements IObterPagamentoUseCase {

  constructor(
    private pagamentoRepositoryGateway: IPagamentoRepositoryGateway,
    private logger: Logger
  ) {
  }

  async obtemPagamentoPorPedidoId(pedidoId: number): Promise<PagamentoDto[]> {
    return await this.pagamentoRepositoryGateway.obterPorPedidoId(pedidoId);
  }
}