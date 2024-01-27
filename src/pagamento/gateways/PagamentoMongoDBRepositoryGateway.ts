import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PagamentoModel } from './models';
import { Repository } from 'typeorm';
import { IPagamentoRepositoryGateway } from '../interfaces';
import { PagamentoDto } from '../dtos';

@Injectable()
export class PagamentoMongoDBRepositoryGateway implements IPagamentoRepositoryGateway {
    constructor(
        // @InjectRepository(PagamentoModel) private pagamentoRepository: Repository<PagamentoModel>
    ) {}
    
    salvar(dto: PagamentoDto): Promise<PagamentoDto> {
        throw new Error('Method not implemented.');
    }
    atualizarStatus(pagamento: PagamentoDto): Promise<void> {
        throw new Error('Method not implemented.');
    }
    atualizarCodigoPagamento(pagamento: PagamentoDto): Promise<void> {
        throw new Error('Method not implemented.');
    }
    obterPorId(pagamentoId: number): Promise<PagamentoDto> {
        throw new Error('Method not implemented.');
    }
    obterPorPedidoId(pedidoId: number): Promise<PagamentoDto[]> {
        throw new Error('Method not implemented.');
    }
    obterPorPedidoIdECodigoPagamento(pedidoId: number, codigoPagamento: string): Promise<PagamentoDto> {
        throw new Error('Method not implemented.');
    }
    obterPorCodigoPagamento(codigoPagamento: string): Promise<PagamentoDto> {
        throw new Error('Method not implemented.');
    }
}