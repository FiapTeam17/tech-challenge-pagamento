import { QrCodeResponseDto } from "../dtos";

export const IGerarQrCodeMpUseCase: unique symbol = Symbol("IGerarQrCodeMpUseCase");

export interface IGerarQrCodeMpUseCase {
    gerarQrCode(pagamentoId: number, valor: number): Promise<QrCodeResponseDto>;
}