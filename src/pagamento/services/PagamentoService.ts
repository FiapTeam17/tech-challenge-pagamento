import { DataSource } from "typeorm";
import { StatusPagamento } from "../types";
import {
    IAtualizarStatusPagamentoUseCase,
    IConfirmarPagamentoUseCase,
    ICriarPagamentoUseCase, IGerarQrCodeMpUseCase,
    IObterPagamentoUseCase,
    IPagamentoMpServiceHttpGateway,
    IPagamentoRepositoryGateway
} from "../interfaces";
import { PagamentoMockServiceHttpGateway } from "../gateways/http";
import { IAtualizarStatusPedidoUseCase } from "../interfaces/IAtualizarStatusPedidoUseCase";
import { AtualizarStatusPagamentoUseCase, ConfirmarPagamentoUseCase, ObterPagamentoUseCase } from "../usecases";
import { PagamentoDto } from "../dtos";
import { CriacaoPagamentoDto } from "../dtos/CriacaoPagamentoDto";
import { Logger } from "@nestjs/common";
import { PagamentoMongoRepositoryGateway } from "../gateways";
import { CriarPagamentoUseCase } from "../usecases/CriarPagamentoUseCase";
import { GerarQrCodeMpUseCase } from "../usecases/GerarQrCodeMpUseCase";

export class PagamentoService {

    private readonly atualizarStatusPedidoUseCase: IAtualizarStatusPedidoUseCase ;

    private readonly pagamentoRepositoryGateway: IPagamentoRepositoryGateway;
    private readonly pagamentoMpServiceHttpGateway: IPagamentoMpServiceHttpGateway;
    private readonly obterPagamentoUseCase: IObterPagamentoUseCase;
    private readonly atualizarStatusPagamentoUseCase: IAtualizarStatusPagamentoUseCase;
    private readonly confirmarPagamentoUseCase: IConfirmarPagamentoUseCase;
    private readonly criarPagamentoUseCase: ICriarPagamentoUseCase;
    private readonly gerarQrCodeMpUseCase: IGerarQrCodeMpUseCase;
    constructor(
        private dataSource: DataSource,
        private logger: Logger
    ) {
        this.pagamentoRepositoryGateway = new PagamentoMongoRepositoryGateway(this.dataSource, this.logger);
        this.pagamentoMpServiceHttpGateway = new PagamentoMockServiceHttpGateway(this.logger);

        this.obterPagamentoUseCase = new ObterPagamentoUseCase(this.pagamentoRepositoryGateway, this.logger);
        this.atualizarStatusPagamentoUseCase = new AtualizarStatusPagamentoUseCase(this.pagamentoRepositoryGateway, this.logger);
        this.confirmarPagamentoUseCase = new ConfirmarPagamentoUseCase(this.pagamentoMpServiceHttpGateway,
            this.atualizarStatusPedidoUseCase, this.pagamentoRepositoryGateway, this.logger);
        this.gerarQrCodeMpUseCase = new GerarQrCodeMpUseCase(this.pagamentoMpServiceHttpGateway, this.logger);
        this.criarPagamentoUseCase = new CriarPagamentoUseCase(this.pagamentoRepositoryGateway, this.gerarQrCodeMpUseCase ,this.logger);
    }

    async obtemPagamentoPorPedidoId(pedidoId: number): Promise<PagamentoDto[]> {
        return await this.obterPagamentoUseCase.obtemPagamentoPorPedidoId(pedidoId);
    }

    async atualizarStatus(pedidoId: number, codigoPagamento: string, status: StatusPagamento): Promise<void> {
        await this.atualizarStatusPagamentoUseCase.atualizarStatus(pedidoId, codigoPagamento, status);
    }

    async confirmar(codigoPagamento: string, statusPagamento: string): Promise<void> {
        await this.confirmarPagamentoUseCase.confirmar(codigoPagamento, statusPagamento);
    }

    async confirmarPagamentoMercadoPago(codigoPagamento: string): Promise<void> {
        await this.confirmarPagamentoUseCase.confirmarPagamentoMercadoPago(codigoPagamento);
    }

    async confirmarPagamentoMockMercadoPago(pedidoId: number): Promise<void> {
        await this.confirmarPagamentoUseCase.confirmarPagamentoMockMercadoPago(pedidoId);
    }

    async criaPagamento(criacaoPagamentoMockMpDto: CriacaoPagamentoDto): Promise<PagamentoDto> {
        return await this.criarPagamentoUseCase.criar(criacaoPagamentoMockMpDto);
    }
}