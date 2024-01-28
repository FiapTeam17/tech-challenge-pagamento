import { ApiProperty } from "@nestjs/swagger";

export class CriacaoPagamentoDto {
    @ApiProperty({
        description: "Identificação do pagamento",
        type: String,
        example: "123"
    })
    identificador?: string;

    @ApiProperty({
        description: "URL de callback do pedido",
        type: String,
        example: "http://localhost:8083/RetornoPagamento"
    })
    urlCallback?: string;

    @ApiProperty({
        description: "Valor a ser pago",
        type: Number,
        example: "123.5"
    })
    valorPedido?: number;
}