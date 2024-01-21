import { Logger } from '@nestjs/common';
import { PedidoNotFoundException } from './exceptions';
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
        this.logger.log("Start identificadorPagamento={}, statusPagamento={}", codigoPagamento, statusPagamento);
        const pagamento = await this.pagamentoRepositoryGateway.obterPorCodigoPagamento(codigoPagamento);
        if (!pagamento) {
            this.logger.warn("Pagamento não encontrado. identificadorPagamento={}", codigoPagamento);
            throw new PedidoNotFoundException();
        }
        const pagamentoDto = pagamento;
        pagamentoDto.status = PagamentoEntity.mapStatus(statusPagamento);
        await this.pagamentoRepositoryGateway.atualizarStatus(pagamentoDto);
        if (pagamentoDto.status === StatusPagamento.PAGO) {
            await this.atualizarStatusPedidoUseCase.atualizarStatus(pagamentoDto.pedidoId as number, StatusPedido.RECEBIDO);
        }
        this.logger.log("End");
    }

    async confirmarPagamentoMercadoPago(codigoPagamento: string): Promise<void> {
        const pagamentoMp = await this.pagamentoMpServiceHttpGateway.obterPagamento(codigoPagamento);
        const pagamentoMpDto = pagamentoMp;
        await this.confirmar(codigoPagamento, pagamentoMpDto.status.toLowerCase());
    }

    async confirmarPagamentoMockMercadoPago(pedidoId: number): Promise<void> {
        const crypto = require('crypto');
        const pagamentoDto = await this.pagamentoRepositoryGateway.obterPorPedidoId(pedidoId);
        if (pagamentoDto == undefined || pagamentoDto.length == 0) {
            this.logger.warn("Pagamento não encontrado. pedidoId={}", pedidoId);
            throw new PedidoNotFoundException();
        }

        const pagamentoDtoUltimoRegistro = pagamentoDto[pagamentoDto.length - 1];
        pagamentoDtoUltimoRegistro.codigoPagamento = crypto.randomBytes(8).join('');

        await this.pagamentoRepositoryGateway.atualizarCodigoPagamento(pagamentoDtoUltimoRegistro);
        const pagamentoMercadoPagoDto = new PagamentoMercadoPagoDto();
        pagamentoMercadoPagoDto.id = pagamentoDtoUltimoRegistro.codigoPagamento as string;

        const pagamentoMp = await this.pagamentoMpServiceHttpGateway.obterPagamento(pagamentoMercadoPagoDto.id.toString());
        const pagamentoMpDto = pagamentoMp;
        await this.confirmar(pagamentoMpDto.id, pagamentoMpDto.status);
    }
}