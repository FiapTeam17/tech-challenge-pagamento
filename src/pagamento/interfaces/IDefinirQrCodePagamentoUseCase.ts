import { PagamentoDto } from "../dtos";

export const IDefinirQrCodePagamentoUseCase: unique symbol = Symbol("IDefinirQrCodePagamentoUseCase");

export interface IDefinirQrCodePagamentoUseCase {
    atualizar(pagamentoId: number, qrCode: string): Promise<PagamentoDto>;
}