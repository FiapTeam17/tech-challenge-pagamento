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
import { ConfirmarPagamentoUseCase, CriarPagamentoUseCase, GerarQrCodeMpUseCase } from "../usecases";
import { ISqsGateway } from '../interfaces/ISqsGateway';
import { SqsGateway } from '../gateways/SqsGateway';
import { AwsConfigService } from '../../config/aws';
import { IObterPagamentoUseCase } from "../interfaces/IObterPagamentoUseCase";
import { ObterPagamentosUseCase } from "../usecases/ObterPagamentoUseCase";

export class PagamentoService {

    private readonly pagamentoRepositoryGateway: IPagamentoRepositoryGateway;
    private readonly pagamentoMpServiceHttpGateway: IPagamentoMpServiceHttpGateway;
    private readonly confirmarPagamentoUseCase: IConfirmarPagamentoUseCase;
    private readonly criarPagamentoUseCase: ICriarPagamentoUseCase;
    private readonly gerarQrCodeMpUseCase: IGerarQrCodeMpUseCase;
    private readonly obterPagamentoUseCase: IObterPagamentoUseCase;
    private readonly sqsGateway: ISqsGateway;

    constructor(
        private dataSource: DataSource,
        private logger: Logger
    ) {
        this.pagamentoRepositoryGateway = new PagamentoMongoRepositoryGateway(this.dataSource, this.logger);
        this.pagamentoMpServiceHttpGateway = new PagamentoMpMockServiceHttpGateway(this.logger);
        let awsConfigService = new AwsConfigService();
        this.sqsGateway = new SqsGateway(awsConfigService);
        this.confirmarPagamentoUseCase = new ConfirmarPagamentoUseCase(this.pagamentoMpServiceHttpGateway,
            this.pagamentoRepositoryGateway, this.sqsGateway, this.logger);
        this.gerarQrCodeMpUseCase = new GerarQrCodeMpUseCase(this.pagamentoMpServiceHttpGateway, this.logger);
        this.criarPagamentoUseCase = new CriarPagamentoUseCase(this.pagamentoRepositoryGateway, this.gerarQrCodeMpUseCase, this.logger);
        this.criarPagamentoUseCase = new CriarPagamentoUseCase(this.pagamentoRepositoryGateway, this.gerarQrCodeMpUseCase, this.logger);
        this.obterPagamentoUseCase = new ObterPagamentosUseCase(this.pagamentoRepositoryGateway, this.logger);
    }

    async confirmar(identificador: string, statusPagamento: string): Promise<PagamentoDto> {
        return await this.confirmarPagamentoUseCase.confirmar(identificador, statusPagamento);
    }

    async confirmarPagamentoMercadoPago(codigoPagamento: string): Promise<PagamentoDto> {
        return await this.confirmarPagamentoUseCase.confirmarPagamentoMercadoPago(codigoPagamento);
    }

    async criaPagamento(criacaoPagamentoMpDto: CriacaoPagamentoDto): Promise<PagamentoDto> {
        return await this.criarPagamentoUseCase.criar(criacaoPagamentoMpDto);
    }

    async obterPagamentos(): Promise<PagamentoDto[]> {
        return await this.obterPagamentoUseCase.obterPagamentos();
    }
}
