import { BadRequestException, Logger } from "@nestjs/common";
import { ICriarPagamentoUseCase, IGerarQrCodeMpUseCase, IPagamentoRepositoryGateway } from "../interfaces";
import { StatusPagamento } from "../types";
import { PagamentoDto } from "../dtos";
import { CriacaoPagamentoDto } from "../dtos/CriacaoPagamentoDto";

export class CriarPagamentoUseCase implements ICriarPagamentoUseCase {
    constructor(
        private pagamentoRepositoryGateway: IPagamentoRepositoryGateway,
        private gerarQrCodeMpUseCase: IGerarQrCodeMpUseCase,
        private logger: Logger) {
    }

    async criar(criacaoPagamentoDto: CriacaoPagamentoDto): Promise<PagamentoDto> {
        
        if(!criacaoPagamentoDto.identificador){
            throw new BadRequestException("Pedido não informado");
        }
        
        if(!criacaoPagamentoDto.valorPedido){
            throw new BadRequestException("Valor não informado");
        }
        
        if(criacaoPagamentoDto.valorPedido <= 0){
            throw new BadRequestException("Valor deve ser maior que zero");
        }
        
        let pagamento = new PagamentoDto(undefined,
            criacaoPagamentoDto.identificador,
            StatusPagamento.PENDENTE,
            criacaoPagamentoDto.urlCallback);
        const pagamentoMP = await this.gerarQrCodeMpUseCase.gerarQrCode(criacaoPagamentoDto.identificador, criacaoPagamentoDto.valorPedido);
        pagamento.qrCode = pagamentoMP.qr_data;
        return await this.pagamentoRepositoryGateway.salvar(pagamento);
    }
}