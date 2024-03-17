import { BadRequestException, Logger } from "@nestjs/common";
import { ICriarPagamentoUseCase, IGerarQrCodeMpUseCase, IPagamentoRepositoryGateway } from "../interfaces";
import { StatusPagamento } from "../types";
import { CriacaoPagamentoDto, PagamentoDto } from "../dtos";

export class CriarPagamentoUseCase implements ICriarPagamentoUseCase {
    constructor(
        private pagamentoRepositoryGateway: IPagamentoRepositoryGateway,
        private gerarQrCodeMpUseCase: IGerarQrCodeMpUseCase,
        private logger: Logger) {
    }

    async criar(criacaoPagamentoDto: CriacaoPagamentoDto): Promise<PagamentoDto> {

        if (!criacaoPagamentoDto.identificador) {
            throw new BadRequestException("Pedido não informado");
        }

        if (!criacaoPagamentoDto.valor) {
            throw new BadRequestException("Valor não informado");
        }

        if (criacaoPagamentoDto.valor <= 0) {
            throw new BadRequestException("Valor deve ser maior que zero");
        }

        let pagamento = new PagamentoDto(undefined,
            criacaoPagamentoDto.identificador,
            new Date(),
            criacaoPagamentoDto.valor,
            StatusPagamento.PENDENTE);
        const pagamentoMP = await this.gerarQrCodeMpUseCase.gerarQrCode(Number(criacaoPagamentoDto.identificador), criacaoPagamentoDto.valor);
        pagamento.qrCode = pagamentoMP.qr_data;
        return await this.pagamentoRepositoryGateway.salvar(pagamento);
    }
}
