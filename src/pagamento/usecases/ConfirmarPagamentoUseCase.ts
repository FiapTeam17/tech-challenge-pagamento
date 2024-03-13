import {BadRequestException, Logger} from '@nestjs/common';
import {IConfirmarPagamentoUseCase, IPagamentoMpServiceHttpGateway, IPagamentoRepositoryGateway} from "../interfaces";
import {PagamentoDto} from "../dtos";
import {StatusPagamentoEnumMapper} from "../types";
import { ISqsGateway } from '../interfaces/ISqsGateway';

export class ConfirmarPagamentoUseCase implements IConfirmarPagamentoUseCase {

    private sqsUrl: string;
    constructor(
        private pagamentoMpServiceHttpGateway: IPagamentoMpServiceHttpGateway,
        private pagamentoRepositoryGateway: IPagamentoRepositoryGateway,
        private readonly sqsGateway: ISqsGateway,
        private logger: Logger
    ) {
        this.sqsUrl = process.env.QUEUE_URL || "https://sqs.us-east-2.amazonaws.com/258775715661/";
    }

    async confirmar(identificador: string, statusPagamento: string): Promise<PagamentoDto> {
        const pagamentoDto = await this.pagamentoRepositoryGateway.obterPorIdentificador(identificador);
        if (!pagamentoDto) {
            throw new BadRequestException("Pagamento não encontrado");
        }
        
        pagamentoDto.status = StatusPagamentoEnumMapper.stringParaEnum(statusPagamento);
        await this.pagamentoRepositoryGateway.atualizarStatus(pagamentoDto);

        const atualizaStatus: any = {

            identificador: pagamentoDto.identificador,
            status: pagamentoDto.status
        };

        await this.sqsGateway.sendMessage(`Pedido${pagamentoDto.identificador}`, this.sqsUrl.concat("pedido-to-pagamento-atualiza-status.fifo"), atualizaStatus);

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
