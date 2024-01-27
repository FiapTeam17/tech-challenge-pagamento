import { BadGatewayException, Logger } from '@nestjs/common';
import { PagamentoEntity } from '../entities';
import { StatusPagamento } from '../types';
import { IConfirmarPagamentoUseCase, IPagamentoMpServiceHttpGateway, IPagamentoRepositoryGateway } from "../interfaces";
import { PagamentoMercadoPagoDto } from '../dtos';
import { StatusPedido } from 'src/pedido/entities/StatusPedido';
import { IAtualizarStatusPedidoUseCase } from '../interfaces/IAtualizarStatusPedidoUseCase';

export class ConfirmarPagamentoUseCase implements IConfirmarPagamentoUseCase {

    constructor(
        private pagamentoMpServiceHttpGateway: IPagamentoMpServiceHttpGateway,
        private atualizarStatusPedidoUseCase: IAtualizarStatusPedidoUseCase,
        private pagamentoRepositoryGateway: IPagamentoRepositoryGateway,
        private logger: Logger
    ) {

    }

    async confirmar(codigoPagamento: string, statusPagamento: string): Promise<void> {
        const pagamento = await this.pagamentoRepositoryGateway.obterPorCodigoPagamento(codigoPagamento);
        if (!pagamento) {
            throw new BadGatewayException("Pagamento não encontrado");
        }
        const pagamentoDto = pagamento;
        pagamentoDto.status = PagamentoEntity.mapStatus(statusPagamento);
        await this.pagamentoRepositoryGateway.atualizarStatus(pagamentoDto);
        if (pagamentoDto.status === StatusPagamento.PAGO) {
            await this.atualizarStatusPedidoUseCase.atualizarStatus(pagamentoDto.pedidoId as number, StatusPedido.RECEBIDO);
        }
    }

    async confirmarPagamentoMercadoPago(codigoPagamento: string): Promise<void> {
        const pagamentoMpDto = await this.pagamentoMpServiceHttpGateway.obterPagamento(codigoPagamento);
        await this.confirmar(codigoPagamento, pagamentoMpDto.status.toLowerCase());
    }

    async confirmarPagamentoMockMercadoPago(pedidoId: number): Promise<void> {
        const crypto = require('crypto');
        const pagamentoDto = await this.pagamentoRepositoryGateway.obterPorPedidoId(pedidoId);
        if (pagamentoDto == undefined || pagamentoDto.length == 0) {
            throw new BadGatewayException("Pagamento não encontrado");
        }

        const pagamentoDtoUltimoRegistro = pagamentoDto[pagamentoDto.length - 1];
        pagamentoDtoUltimoRegistro.codigoPagamento = crypto.randomBytes(8).join('');

        await this.pagamentoRepositoryGateway.atualizarCodigoPagamento(pagamentoDtoUltimoRegistro);
        const pagamentoMercadoPagoDto = new PagamentoMercadoPagoDto();
        pagamentoMercadoPagoDto.id = pagamentoDtoUltimoRegistro.codigoPagamento as string;

        const pagamentoMpDto = await this.pagamentoMpServiceHttpGateway.obterPagamento(pagamentoMercadoPagoDto.id.toString());
        await this.confirmar(pagamentoMpDto.id, pagamentoMpDto.status);
    }
}