import { BadRequestException, Logger } from "@nestjs/common";
import { IDefinirQrCodePagamentoUseCase, IPagamentoRepositoryGateway } from "../interfaces";
import { PagamentoDto } from "../dtos";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";

export class DefinirQrCodePagamentoUseCase implements IDefinirQrCodePagamentoUseCase {
    constructor(
        private pagamentoRepositoryGateway: IPagamentoRepositoryGateway,
        private logger: Logger) {
    }

    async atualizar(pagamentoId: number, qrCode: string): Promise<PagamentoDto> {
        const pagamentoOp = await this.pagamentoRepositoryGateway.obterPorId(pagamentoId);
        if (!pagamentoOp) {
            throw new BadRequestException("Pagamento não encontrado");
        }

        const pagamentoDto = pagamentoOp;
        pagamentoDto.qrCode = qrCode;

        return await this.pagamentoRepositoryGateway.salvar(pagamentoDto);
    }
}