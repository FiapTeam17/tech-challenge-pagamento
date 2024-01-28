import { PagamentoMercadoPagoDto, QrCodeRequestDto, QrCodeResponseDto } from "../dtos";

export const IPagamentoMpServiceHttpGateway: unique symbol = Symbol("IPagamentoMpServiceHttpGateway");

export interface IPagamentoMpServiceHttpGateway {
    criarQrCode(qrCodeDtoRequestDto: QrCodeRequestDto): Promise<QrCodeResponseDto>
    obterPagamento(codigoPagamento: string): Promise<PagamentoMercadoPagoDto>;
}