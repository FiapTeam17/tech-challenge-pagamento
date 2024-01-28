import {DataSource, MongoRepository} from "typeorm";
import {PagamentoModel} from "./models";
import {IPagamentoRepositoryGateway} from "../interfaces";
import {PagamentoDto} from "../dtos";
import {Logger} from "@nestjs/common";

export class PagamentoMongoRepositoryGateway implements IPagamentoRepositoryGateway {

    protected pagamentoRepository: MongoRepository<PagamentoModel>;

    constructor(
        private dataSource: DataSource,
        private logger: Logger,
    ) {
        this.pagamentoRepository = this.dataSource.getMongoRepository(PagamentoModel);
    }

    async obterPorCodigoPagamento(codigoPagamento: string): Promise<PagamentoDto> {
        const pagamentoModel = await this.pagamentoRepository.findOneBy({
            codigoPagamento: codigoPagamento
        });
        return pagamentoModel?.getDto();
    }

    async salvar(pagamentoDto: PagamentoDto): Promise<PagamentoDto> {
        const pagamentoEntityCreated = await this.pagamentoRepository.save(PagamentoModel.getInstancia(pagamentoDto));
        pagamentoDto.id = pagamentoEntityCreated.id.toString();
        return pagamentoDto
    }

    async atualizarStatus(pagamento: PagamentoDto): Promise<void> {
        await this.pagamentoRepository.update(pagamento.id, {
            status: pagamento?.status?.toString()
        });
    }

    async obterPorIdentificador(identificador: string): Promise<PagamentoDto> {
        const pagamentoModel = await this.pagamentoRepository.findOneBy( {
            identificador: identificador
        });
        return pagamentoModel?.getDto();
    }
}