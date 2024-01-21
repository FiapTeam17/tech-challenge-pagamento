import { Logger } from "@nestjs/common";
import { ICriarPagamentoUseCase, IPagamentoRepositoryGateway } from "../interfaces";
import { StatusPagamento } from "../types";
import { PagamentoDto } from "../dtos";

export class CriarPagamentoUseCase implements ICriarPagamentoUseCase {
    constructor(
        private pagamentoRepositoryGateway: IPagamentoRepositoryGateway,
        private logger: Logger) {
    }

    async criar(pagamentoDto: PagamentoDto): Promise<PagamentoDto> {
        pagamentoDto.status = StatusPagamento.PENDENTE;
        return await this.pagamentoRepositoryGateway.salvar(pagamentoDto);
    }
}