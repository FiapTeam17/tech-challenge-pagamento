import { Body, Controller, Inject, Logger, Post } from "@nestjs/common";
import { DATA_SOURCE } from "../../common/constants";
import { DataSource } from "typeorm";
import { ApiResponse } from "@nestjs/swagger";
import { ConfirmacaoPagamentoDto, ConfirmacaoPagamentoMpDto, CriacaoPagamentoDto, PagamentoDto } from "../dtos";
import { PagamentoService } from "../services";

@Controller("/pagamentos")
export class PagamentoController {

    private pagamentoService: PagamentoService;
    private readonly logger = new Logger(PagamentoController.name);
    constructor(@Inject(DATA_SOURCE) private dataSource: DataSource) {
        this.pagamentoService = new PagamentoService(this.dataSource, this.logger);
    }

    @Post("/confirmar")
    @ApiResponse({
        status: 200
    })
    async confirmar(@Body() confirmacaoPagamentoJson: ConfirmacaoPagamentoDto): Promise<PagamentoDto> {
       return await this.pagamentoService.confirmar(confirmacaoPagamentoJson.identificador, confirmacaoPagamentoJson.status);
    }

    @Post("/confirmarMercadoPago")
    async confirmarMercadoPago(@Body() confirmacaoPagamentoMpJson: ConfirmacaoPagamentoMpDto): Promise<PagamentoDto> {
      return await this.pagamentoService.confirmarPagamentoMercadoPago(confirmacaoPagamentoMpJson.data.id);
    }

    @Post("/criar")
    @ApiResponse({
        status: 201,
        type: PagamentoDto
    })
    async criarPagamento(@Body() criacaoPagamentoMpDto: CriacaoPagamentoDto): Promise<PagamentoDto> {
       return await this.pagamentoService.criaPagamento(criacaoPagamentoMpDto);
    }
}