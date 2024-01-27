import { ApiProperty } from "@nestjs/swagger";

export class CriacaoPagamentoDto {
    @ApiProperty({
        description: "Id do pedido para criar o pagamento",
        example: "123"
    })
    pedidoId?: number;

    @ApiProperty({
        description: "URL de callback do pedido",
        example: "http://localhost:8083/RetornoPagamento"
    })
    urlCallback?: string;

    @ApiProperty({
        description: "Valor a ser pago",
        example: "123.5"
    })
    valorPedido?: number;
}