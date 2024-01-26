import axios from "axios";
import { PagamentoMercadoPagoDto, QrCodeRequestDto, QrCodeResponseDto } from "src/pagamento/dtos";
import { IPagamentoMpServiceHttpGateway } from "src/pagamento/interfaces";
import { ErrorToAccessPagamentoServicoExternoException } from "src/pagamento/usecases/exceptions";
import { StatusPedido } from "src/pedido/entities/StatusPedido";
import { Logger } from "typeorm";

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

            this.logger.log("info", `Try connect mercadopago. config=${config}`);
            const response = await axios.request<PagamentoMercadoPagoDto>(config);
            this.logger.log("info", `response=${config}`);
            return response.data;
        } catch (error) {
            this.logger.log("warn", `Erro ao obter pagamento no Mercado Pago. identificadorPagamento=${identificadorPagamento}`);
            throw new ErrorToAccessPagamentoServicoExternoException();
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

            this.logger.log("log", "Try connect mercadopago. config={}");
            const response = await axios.request<QrCodeResponseDto>(config);
            this.logger.log("log", "response={}");
            return response.data;
        } catch (error) {
            this.logger.log("warn", "Erro ao gerar o qrcode no Mercado Pago. identificadorPagamento={}");
            throw new ErrorToAccessPagamentoServicoExternoException();
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