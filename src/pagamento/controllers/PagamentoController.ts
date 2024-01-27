import { Body, Controller, Delete, Get, Inject, Logger, Param, Post, Put } from '@nestjs/common';
import { PagamentoService } from "../services";
import { CriacaoPagamentoMockMpDto } from "../dtos/CriacaoPagamentoMpDto";
import { ConfirmacaoPagamentoDto, ConfirmacaoPagamentoMockMpDto, ConfirmacaoPagamentoMpDto } from '../dtos';
import { ErrorToAccessPagamentoServicoExternoException } from '../usecases/exceptions';

@Controller("")
export class PagamentoController {

    private pagamentoService: PagamentoService;
    private readonly logger = new Logger(PagamentoController.name);
    constructor() {
        this.pagamentoService = new PagamentoService(undefined, this.logger);
    }

    @Post("/pagamentos/confirmar")
    async confirmar(@Body() confirmacaoPagamentoJson: ConfirmacaoPagamentoDto): Promise<void> {
        this.logger.log("Start confirmacaoPagamentoJson={}", confirmacaoPagamentoJson);

        //fixme: Esta chamada deve ser async
        await this.pagamentoService.confirmar(confirmacaoPagamentoJson.identificador, confirmacaoPagamentoJson.status);
        this.logger.log("End");
    }

    @Post("/pagamentos/confirmarMercadoPago")
    async confirmarMercadoPago(@Body() confirmacaoPagamentoMpJson: ConfirmacaoPagamentoMpDto): Promise<void> {
        await this.pagamentoService.confirmarPagamentoMercadoPago(confirmacaoPagamentoMpJson.data.id);
    }

    @Post("/pagamentos/confirmarMockMercadoPago")
    async confirmarMockMercadoPago(@Body() confirmacaoPagamentoMpJson: ConfirmacaoPagamentoMockMpDto): Promise<void> {
        if (confirmacaoPagamentoMpJson.pedidoId === undefined) {
            this.logger.warn("Pedido esta vazio. pedidoId={}", confirmacaoPagamentoMpJson.pedidoId);
            throw new ErrorToAccessPagamentoServicoExternoException;
        }
        await this.pagamentoService.confirmarPagamentoMockMercadoPago(confirmacaoPagamentoMpJson.pedidoId as number);

    }

    @Post("/pagamentos/criar")
    async criarPagamento(@Body() CriacaoPagamentoMockMpDto: ConfirmacaoPagamentoMockMpDto): Promise<void> {
        if (CriacaoPagamentoMockMpDto.pedidoId === undefined) {
            this.logger.warn("Pedido esta vazio. pedidoId={}", CriacaoPagamentoMockMpDto.pedidoId);
            throw new ErrorToAccessPagamentoServicoExternoException();
        }
        await this.pagamentoService.criaPagamento(CriacaoPagamentoMockMpDto);

    }
}