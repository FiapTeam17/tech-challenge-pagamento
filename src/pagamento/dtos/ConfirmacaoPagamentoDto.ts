import { StatusPagamento } from "../types";
import { ApiProperty } from "@nestjs/swagger";

export class ConfirmacaoPagamentoDto {
    @ApiProperty({
        description: "Identificador do pagamento",
        type: String,
        example: 123
    })
    readonly identificador: string;
    
    @ApiProperty({
        description: "Status do pagamento",
        example: "PAGO",
        enum: StatusPagamento
    })
    readonly status: StatusPagamento;
}