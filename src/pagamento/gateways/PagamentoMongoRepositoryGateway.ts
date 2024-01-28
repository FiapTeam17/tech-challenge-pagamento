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
    
    async atualizarCodigoPagamento(pagamento: PagamentoDto): Promise<void> {
        const pagamentoId = pagamento.id as number;
        await this.pagamentoRepository.update(pagamentoId, {
            codigoPagamento: pagamento?.codigoPagamento?.toString()
        });
    }
    
    async obterPorPedidoId(pedidoId: number): Promise<PagamentoDto[]> {
        
        const pagamentosEntities = await this.pagamentoRepository.findBy({ identificacao: Equal(pedidoId) });
        return pagamentosEntities.map(pag => pag.getDto());
    }
    
    async obterPorPedidoIdECodigoPagamento(pedidoId: number, identificador: string): Promise<PagamentoDto> {
        const pagamentoEntity = await this.pagamentoRepository.findOneBy({
            identificacao: Equal(pedidoId),
            codigoPagamento: identificador
        });
        return pagamentoEntity?.getDto();
    }
    
    async obterPorCodigoPagamento(identificador: string): Promise<PagamentoDto> {
        const pagamentosEntities = await this.pagamentoRepository.findOneBy({ codigoPagamento: Equal(identificador) });
        return pagamentosEntities?.getDto();
    }
    
    async obterPorId(pagamentoId: number): Promise<PagamentoDto> {
        const pagamentosEntities = await this.pagamentoRepository.findOneBy({ id: Equal(pagamentoId) });
        if(pagamentosEntities != null) {
            return pagamentosEntities.getDto();
        }
        
        return null;
    }
}