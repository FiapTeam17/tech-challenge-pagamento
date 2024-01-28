import {BadRequestException} from '@nestjs/common';
import {StatusPagamento} from "./StatusPagamento";

export class StatusPagamentoEnumMapper {

    static stringParaEnum(opcao?: string): StatusPagamento {
        switch (opcao?.toUpperCase()) {
            case "CANCELLED":
                return StatusPagamento.CANCELADO;
            case "REFUNDED":
                return StatusPagamento.CANCELADO;
            case "CHARGED_BACK":
                return StatusPagamento.CANCELADO;
            case "CANCELADO":
                return StatusPagamento.CANCELADO;
            case "APPROVED":
                return StatusPagamento.PAGO;
            case "PAGO":
                return StatusPagamento.PAGO;
            case "REJECTED":
                return StatusPagamento.REJEITADO;
            case "REJEITADO":
                return StatusPagamento.REJEITADO;
            case "PENDENTE":
                return StatusPagamento.PENDENTE;

            default:
                throw new BadRequestException("Status inválido");
        }
    }

    static enumParaString(status?: StatusPagamento): string {

        switch (status) {
            case StatusPagamento.CANCELADO:
                return "CANCELADO";
            case StatusPagamento.PAGO:
                return "PAGO";
            case StatusPagamento.PENDENTE:
                return "PENDENTE";
            case StatusPagamento.REJEITADO:
                return "REJEITADO";
            default:
                throw new BadRequestException("Status inválido");
        }
    }
}