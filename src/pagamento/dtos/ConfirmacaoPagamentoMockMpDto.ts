import { ApiProperty } from "@nestjs/swagger";
import { ConfirmacaoPagamentoMpDto } from "./ConfirmacaoPagamentoMpDto";

export class ConfirmacaoPagamentoMockMpDto extends ConfirmacaoPagamentoMpDto{
    @ApiProperty({
        description: "Id do pedido para confirmar o pagamento",
        example: "123"
    })
    pedidoId?: number;
}

