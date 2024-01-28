import { Body, Controller, Inject, Logger, Post } from '@nestjs/common';
import { PagamentoService } from "../services";
import { CriacaoPagamentoDto } from "../dtos/CriacaoPagamentoDto";
import {
    ConfirmacaoPagamentoDto,
    ConfirmacaoPagamentoMockMpDto,
    ConfirmacaoPagamentoMpDto,
    PagamentoDto
} from '../dtos';
import { DATA_SOURCE } from "../../common/constants";
import { DataSource } from 'typeorm';

@Controller("/pagamentos")
export class PagamentoController {

    private pagamentoService: PagamentoService;
    private readonly logger = new Logger(PagamentoController.name);
    constructor(@Inject(DATA_SOURCE) private dataSource: DataSource) {
        this.pagamentoService = new PagamentoService(this.dataSource, this.logger);
    }

    // @Post("/confirmar")
    // async confirmar(@Body() confirmacaoPagamentoJson: ConfirmacaoPagamentoDto): Promise<void> {
    //     //fixme: Esta chamada deve ser async
    //     await this.pagamentoService.confirmar(confirmacaoPagamentoJson.identificador, confirmacaoPagamentoJson.status);
    // }
    //
    // @Post("/confirmarMercadoPago")
    // async confirmarMercadoPago(@Body() confirmacaoPagamentoMpJson: ConfirmacaoPagamentoMpDto): Promise<void> {
    //     await this.pagamentoService.confirmarPagamentoMercadoPago(confirmacaoPagamentoMpJson.data.id);
    // }
    //
    // @Post("/confirmarMockMercadoPago")
    // async confirmarMockMercadoPago(@Body() confirmacaoPagamentoMpJson: ConfirmacaoPagamentoMockMpDto): Promise<void> {
    //     await this.pagamentoService.confirmarPagamentoMockMercadoPago(confirmacaoPagamentoMpJson.pedidoId as number);
    // }

    @Post("/criar")
    async criarPagamento(@Body() criacaoPagamentoMpDto: CriacaoPagamentoDto): Promise<PagamentoDto> {
       return await this.pagamentoService.criaPagamento(criacaoPagamentoMpDto);
    }
}