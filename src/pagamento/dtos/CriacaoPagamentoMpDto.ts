import { ApiProperty } from "@nestjs/swagger";
import { ConfirmacaoPagamentoMpDto } from "./ConfirmacaoPagamentoMpDto";

export class CriacaoPagamentoMockMpDto extends ConfirmacaoPagamentoMpDto{
    @ApiProperty({
        description: "Id do pedido para criar o pagamento",
        example: "123"
    })
    pedidoId?: number;

    @ApiProperty({
        description: "URL de callback do pedido",
        example: "xxxxxxxxxx"
    })
    urlCallback?: string;

    @ApiProperty({
        description: "Valor a ser pago",
        example: "123.5"
    })
    valorPedido?: number;
}