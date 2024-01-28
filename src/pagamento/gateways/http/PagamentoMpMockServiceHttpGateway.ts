import { Logger } from "@nestjs/common";
import { IPagamentoMpServiceHttpGateway } from "../../interfaces";
import { PagamentoMercadoPagoDto, QrCodeRequestDto, QrCodeResponseDto } from "../../dtos";

export class PagamentoMpMockServiceHttpGateway implements IPagamentoMpServiceHttpGateway {

    constructor(
        private logger: Logger,
    ) {

    }

    criarQrCode(qrCodeDtoRequestDto: QrCodeRequestDto): Promise<QrCodeResponseDto> {
        const crypto = require('crypto');
        const qrCodeMockResponseDto = new QrCodeResponseDto();
        qrCodeMockResponseDto.qr_data = crypto.randomBytes(8).toString('hex');
        return Promise.resolve(qrCodeMockResponseDto);
    }

    obterPagamento(codigoPagamento: string): Promise<PagamentoMercadoPagoDto> {
        const pagamentoMockMercadoPagoDto = new PagamentoMercadoPagoDto();
        pagamentoMockMercadoPagoDto.status = "approved";
        pagamentoMockMercadoPagoDto.id = codigoPagamento;
        return Promise.resolve(pagamentoMockMercadoPagoDto);
    }
}