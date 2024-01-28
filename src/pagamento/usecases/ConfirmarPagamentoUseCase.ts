import { BadGatewayException, Logger } from '@nestjs/common';
import { PagamentoEntity } from '../entities';
import { IConfirmarPagamentoUseCase, IPagamentoMpServiceHttpGateway, IPagamentoRepositoryGateway } from "../interfaces";
import { PagamentoDto } from "../dtos";

export class ConfirmarPagamentoUseCase implements IConfirmarPagamentoUseCase {

    constructor(
        private pagamentoMpServiceHttpGateway: IPagamentoMpServiceHttpGateway,
        private pagamentoRepositoryGateway: IPagamentoRepositoryGateway,
        private logger: Logger
    ) {

    }

    async confirmar(codigoPagamento: string, statusPagamento: string): Promise<PagamentoDto> {
        const pagamentoDto = await this.pagamentoRepositoryGateway.obterPorCodigoPagamento(codigoPagamento);
        if (!pagamentoDto) {
            throw new BadGatewayException("Pagamento não encontrado");
        }
        
        pagamentoDto.status = PagamentoEntity.mapStatus(statusPagamento);
        await this.pagamentoRepositoryGateway.atualizarStatus(pagamentoDto);
        
        if (pagamentoDto.urlCallback) {
            //TODO chamar callback com atualizacao dos dados do pagamento
        }
        return pagamentoDto;
    }

    async confirmarPagamentoMercadoPago(codigoPagamento: string): Promise<PagamentoDto> {
        const pagamentoMpDto = await this.pagamentoMpServiceHttpGateway.obterPagamento(codigoPagamento);
        return await this.confirmar(codigoPagamento, pagamentoMpDto.status.toLowerCase());
    }
}