import { Logger } from "@nestjs/common";
import { IGerarQrCodeMpUseCase, IPagamentoMpServiceHttpGateway } from "../interfaces";
import { QrCodeRequestDto, QrCodeResponseDto } from "../dtos";

export class GerarQrCodeMpUseCase implements IGerarQrCodeMpUseCase {

    constructor(
        private pagamentoMpServiceHttpGateway: IPagamentoMpServiceHttpGateway,
        private logger: Logger
    ) {

    }
    async gerarQrCode(pagamentoId: number, valor: number): Promise<QrCodeResponseDto> {
        const requestDto = new QrCodeRequestDto();
        requestDto.external_reference = pagamentoId;
        requestDto.total_amount = valor;
        return await this.pagamentoMpServiceHttpGateway.criarQrCode(requestDto);
    }
}