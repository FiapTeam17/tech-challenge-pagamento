import { PagamentoMercadoPagoDto, QrCodeRequestDto, QrCodeResponseDto } from "src/pagamento/dtos";
import { IPagamentoMpServiceHttpGateway } from "src/pagamento/interfaces";
import { Logger } from "@nestjs/common";

export class PagamentoMockServiceHttpGateway implements IPagamentoMpServiceHttpGateway {

    constructor(
        private logger: Logger,
    ) {

    }

    criarQrCode(qrCodeDtoRequestDto: QrCodeRequestDto): Promise<QrCodeResponseDto> {
        const crypto = require('crypto');
        qrCodeDtoRequestDto.notification_url = "";
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