import axios from "axios";
import { PagamentoMercadoPagoDto, QrCodeRequestDto, QrCodeResponseDto } from "src/pagamento/dtos";
import { IPagamentoMpServiceHttpGateway } from "src/pagamento/interfaces";
import { StatusPedido } from "src/pedido/entities/StatusPedido";
import { Logger } from "typeorm";
import { InternalServerErrorException } from "@nestjs/common";

export class PagamentoMpServiceHttpGateway implements IPagamentoMpServiceHttpGateway {

    private readonly clientServiceUrlBase: string = "https://api.mercadopago.com";//FIXME: usar arquivo properties
    private readonly token = process.env.token || "TEST-8375344102018334-082012-842b3b0893d786059eed6e0694cc6acf-29575195";

    constructor(
        private logger: Logger
    ) {
    }

    async obterPagamento(identificadorPagamento: string): Promise<PagamentoMercadoPagoDto> {
        try {
            const config = {
                method: "get",
                maxBodyLength: Infinity,
                url: `${this.clientServiceUrlBase}/v1/payments/${identificadorPagamento}`,
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            };
           
            const response = await axios.request<PagamentoMercadoPagoDto>(config);
            return response.data;
        } catch (error) {
            throw new InternalServerErrorException("Erro ao obter pagamento no Mercado Pago");
        }
    }

    async criarQrCode(qrCodeDtoRequestDto: QrCodeRequestDto): Promise<QrCodeResponseDto> {
        try {
            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${this.clientServiceUrlBase}/instore/orders/qr/seller/collectors/29575195/pos/SUC001POS001/qrs`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                data: qrCodeDtoRequestDto
            };
            
            const response = await axios.request<QrCodeResponseDto>(config);
            return response.data;
        } catch (error) {
            throw new InternalServerErrorException("Erro ao gerar o qrcode no Mercado Pago");
        }
    }

    private mapStatus(statusPagamento: string): StatusPedido {
        this.logger.log("log", `Start statusPagamento=${statusPagamento}`);

        let statusPedido = StatusPedido.AGUARDANDO_CONFIRMACAO_PAGAMENTO;
        if (statusPagamento === "pago_sucesso") {
            statusPedido = StatusPedido.EM_PREPARACAO;
        }

        this.logger.log("log", `End statusPedido=${statusPedido}`);
        return statusPedido;
    }
}