import { Logger } from "@nestjs/common";
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

    async criar(criacaoPagamentoMockMpDto: CriacaoPagamentoDto): Promise<PagamentoDto> {
        let pagamento = new PagamentoDto(undefined, criacaoPagamentoMockMpDto.pedidoId, StatusPagamento.PENDENTE)
        pagamento.qrCode = (await this.gerarQrCodeMpUseCase.gerarQrCode(criacaoPagamentoMockMpDto.pedidoId, criacaoPagamentoMockMpDto.valorPedido)).qr_data;
        return await this.pagamentoRepositoryGateway.salvar(pagamento);
    }
}