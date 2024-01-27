import { DataSource, Equal, Repository } from "typeorm";
import { PagamentoModel } from "./models";
import { IPagamentoRepositoryGateway } from "../interfaces";
import { PagamentoDto } from "../dtos";
import { ErrorToAccessDatabaseException } from "src/common/exception/ErrorToAccessDatabaseException";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

export class PagamentoMySqlRepositoryGateway implements IPagamentoRepositoryGateway {

    protected pagamentoRepository: Repository<PagamentoModel>;

    constructor(
        private dataSource: DataSource,
        private logger: Logger,
    ) {
       this.pagamentoRepository = this.dataSource.getRepository(PagamentoModel);
    }

    async salvar(pagamentoDto: PagamentoDto): Promise<PagamentoDto> {
        try {
            const pagamentoEntityCreated = await this.pagamentoRepository.save(PagamentoModel.getInstancia(pagamentoDto));
            pagamentoDto.id = pagamentoEntityCreated.id;

            return pagamentoDto
        } catch (e) {
            this.logger.log("warn", e.message);
            throw new ErrorToAccessDatabaseException();
        }
    }

    async atualizarStatus(pagamento: PagamentoDto): Promise<void> {
        try {
            const pagamentoId = pagamento.id as number;
            await this.pagamentoRepository.update(pagamentoId, {
                status: pagamento?.status?.toString()
            });
        } catch (e) {
            this.logger.log("warn", e.message);
            throw new ErrorToAccessDatabaseException();
        }
    }

    async atualizarCodigoPagamento(pagamento: PagamentoDto): Promise<void> {
        try {
            const pagamentoId = pagamento.id as number;
            await this.pagamentoRepository.update(pagamentoId, {
                codigoPagamento: pagamento?.codigoPagamento?.toString()
            });
        } catch (e) {
            this.logger.log("warn", e.message);
            throw new ErrorToAccessDatabaseException();
        }
    }

    async obterPorPedidoId(pedidoId: number): Promise<PagamentoDto[]> {
        try {
            const pagamentosEntities = await this.pagamentoRepository.findBy({ pedido: Equal(pedidoId) });
            const pagamentosDto = pagamentosEntities.map(pag => pag.getDto());
            return pagamentosDto;
        } catch (e) {
            this.logger.log("warn", e.message);
            throw new ErrorToAccessDatabaseException();
        }
    }

    async obterPorPedidoIdECodigoPagamento(pedidoId: number, identificador: string): Promise<PagamentoDto> {
        try {
            const pagamentoEntity = await this.pagamentoRepository.findOneBy({
                pedido: Equal(pedidoId),
                codigoPagamento: identificador
            });
            const pagamentosDto = pagamentoEntity?.getDto();
            return pagamentosDto;
        } catch (e) {
            this.logger.log("warn", e.message);
            throw new ErrorToAccessDatabaseException();
        }
    }

    async obterPorCodigoPagamento(identificador: string): Promise<PagamentoDto> {
        try {
            const pagamentosEntities = await this.pagamentoRepository.findOneBy({ codigoPagamento: Equal(identificador) });
            const pagamentosDto = pagamentosEntities?.getDto();
            return pagamentosDto;
        } catch (e) {
            this.logger.log("warn", e.message);
            throw new ErrorToAccessDatabaseException();
        }
    }

    async obterPorId(pagamentoId: number): Promise<PagamentoDto> {
        try {
            const pagamentosEntities = await this.pagamentoRepository.findOneBy({ id: Equal(pagamentoId) });
            if(pagamentosEntities != null) {
                const pagamentosDto = pagamentosEntities.getDto();
                return pagamentosDto;
            }

            return null;
        } catch (e) {
            this.logger.log("warn", e.message);
            throw new ErrorToAccessDatabaseException();
        }
    }
}