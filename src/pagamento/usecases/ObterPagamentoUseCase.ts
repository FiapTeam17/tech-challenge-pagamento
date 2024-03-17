import { BadRequestException, Logger } from '@nestjs/common';
import { IObterPagamentoUseCase } from '../interfaces/IObterPagamentoUseCase';
import { IPagamentoRepositoryGateway } from '../interfaces';
import { PagamentoDto } from '../dtos';

export class ObterPagamentosUseCase implements IObterPagamentoUseCase {
    constructor(
        private pagamentoRepositoryGateway: IPagamentoRepositoryGateway,
        private logger: Logger,
    ) { }

    async obterPagamentos(): Promise<PagamentoDto[]> {
        const pagamentos = await this.pagamentoRepositoryGateway.obterPagamentos();
        return pagamentos;
    }
}
