import { DataSource } from "typeorm";
import {
    IConfirmarPagamentoUseCase,
    ICriarPagamentoUseCase,
    IGerarQrCodeMpUseCase,
    IPagamentoMpServiceHttpGateway,
    IPagamentoRepositoryGateway
} from "../interfaces";
import { CriacaoPagamentoDto, PagamentoDto } from "../dtos";
import { Logger } from "@nestjs/common";
import { PagamentoMongoRepositoryGateway } from "../gateways";
import { PagamentoMpMockServiceHttpGateway } from "../gateways/http";
import { CriarPagamentoUseCase } from "../usecases/CriarPagamentoUseCase";
import { ConfirmarPagamentoUseCase } from "../usecases";
import { GerarQrCodeMpUseCase } from "../usecases/GerarQrCodeMpUseCase";

export class PagamentoService {

    private readonly pagamentoRepositoryGateway: IPagamentoRepositoryGateway;
    private readonly pagamentoMpServiceHttpGateway: IPagamentoMpServiceHttpGateway;
    private readonly confirmarPagamentoUseCase: IConfirmarPagamentoUseCase;
    private readonly criarPagamentoUseCase: ICriarPagamentoUseCase;
    private readonly gerarQrCodeMpUseCase: IGerarQrCodeMpUseCase;
    constructor(
        private dataSource: DataSource,
        private logger: Logger
    ) {
        this.pagamentoRepositoryGateway = new PagamentoMongoRepositoryGateway(this.dataSource, this.logger);
        this.pagamentoMpServiceHttpGateway = new PagamentoMpMockServiceHttpGateway(this.logger);
        this.confirmarPagamentoUseCase = new ConfirmarPagamentoUseCase(this.pagamentoMpServiceHttpGateway,
            this.pagamentoRepositoryGateway, this.logger);
        this.gerarQrCodeMpUseCase = new GerarQrCodeMpUseCase(this.pagamentoMpServiceHttpGateway, this.logger);
        this.criarPagamentoUseCase = new CriarPagamentoUseCase(this.pagamentoRepositoryGateway, this.gerarQrCodeMpUseCase,
            this.logger);
    }

    async confirmar(codigoPagamento: string, statusPagamento: string): Promise<PagamentoDto> {
      return await this.confirmarPagamentoUseCase.confirmar(codigoPagamento, statusPagamento);
    }

    async confirmarPagamentoMercadoPago(codigoPagamento: string): Promise<PagamentoDto> {
        return await this.confirmarPagamentoUseCase.confirmarPagamentoMercadoPago(codigoPagamento);
    }

    async criaPagamento(criacaoPagamentoMpDto: CriacaoPagamentoDto): Promise<PagamentoDto> {
        return await this.criarPagamentoUseCase.criar(criacaoPagamentoMpDto);
    }
}