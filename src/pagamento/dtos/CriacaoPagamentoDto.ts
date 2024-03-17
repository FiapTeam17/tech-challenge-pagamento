import { ApiProperty } from "@nestjs/swagger";

export class CriacaoPagamentoDto {
    @ApiProperty({
        description: "Identificação do pagamento",
        type: String,
        example: "123"
    })
    identificador?: string;

    @ApiProperty({
        description: "Valor a ser pago",
        type: Number,
        example: "123.5"
    })
    valor?: number;
}
