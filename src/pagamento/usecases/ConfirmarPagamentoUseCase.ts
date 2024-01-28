import {BadRequestException, Logger} from '@nestjs/common';
import {IConfirmarPagamentoUseCase, IPagamentoMpServiceHttpGateway, IPagamentoRepositoryGateway} from "../interfaces";
import {PagamentoDto} from "../dtos";
import {StatusPagamentoEnumMapper} from "../types";

export class ConfirmarPagamentoUseCase implements IConfirmarPagamentoUseCase {

    constructor(
        private pagamentoMpServiceHttpGateway: IPagamentoMpServiceHttpGateway,
        private pagamentoRepositoryGateway: IPagamentoRepositoryGateway,
        private logger: Logger
    ) {

    }

    async confirmar(identificador: string, statusPagamento: string): Promise<PagamentoDto> {
        const pagamentoDto = await this.pagamentoRepositoryGateway.obterPorIdentificador(identificador);
        if (!pagamentoDto) {
            throw new BadRequestException("Pagamento não encontrado");
        }
        
        pagamentoDto.status = StatusPagamentoEnumMapper.stringParaEnum(statusPagamento);
        await this.pagamentoRepositoryGateway.atualizarStatus(pagamentoDto);
        
        if (pagamentoDto.urlCallback) {
            //TODO chamar callback com atualizacao dos dados do pagamento
        }
        return pagamentoDto;
    }

    async confirmarPagamentoMercadoPago(codigoPagamento: string): Promise<PagamentoDto> {
        const pagamentoDto = await this.pagamentoRepositoryGateway.obterPorCodigoPagamento(codigoPagamento);
        if (!pagamentoDto) {
            throw new BadRequestException("Pagamento não encontrado");
        }

        const pagamentoMpDto = await this.pagamentoMpServiceHttpGateway.obterPagamento(
            pagamentoDto.codigoPagamento
        );
        return await this.confirmar(pagamentoDto.identificador, pagamentoMpDto.status.toLowerCase());
    }
}