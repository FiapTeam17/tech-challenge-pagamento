import { DataSource, Equal, Repository } from "typeorm";
import { PagamentoModel } from "./models";
import { IPagamentoRepositoryGateway } from "../interfaces";
import { PagamentoDto } from "../dtos";
import { Logger } from "@nestjs/common";

export class PagamentoMongoRepositoryGateway implements IPagamentoRepositoryGateway {
    
    protected pagamentoRepository: Repository<PagamentoModel>;
    
    constructor(
        private dataSource: DataSource,
        private logger: Logger,
    ) {
        this.pagamentoRepository = this.dataSource.getRepository(PagamentoModel);
    }

    async obterPorCodigoPagamento(codigoPagamento: string): Promise<PagamentoDto> {
        const pagamentosEntities = await this.pagamentoRepository.findOneBy({
            codigoPagamento: Equal(codigoPagamento)
        });
        return pagamentosEntities?.getDto();
    }

    async salvar(pagamentoDto: PagamentoDto): Promise<PagamentoDto> {
        const pagamentoEntityCreated = await this.pagamentoRepository.save(PagamentoModel.getInstancia(pagamentoDto));
        pagamentoDto.id = pagamentoEntityCreated.id;
        return pagamentoDto
    }
    
    async atualizarStatus(pagamento: PagamentoDto): Promise<void> {
        const pagamentoId = pagamento.id as number;
        await this.pagamentoRepository.update(pagamentoId, {
            status: pagamento?.status?.toString()
        });
    }
    
    async obterPorIdentificador(identificador: number): Promise<PagamentoDto> {
        const pagamentosEntities = await this.pagamentoRepository.findOneBy( {
            identificador: identificador
        });
        return pagamentosEntities?.getDto();
    }

}