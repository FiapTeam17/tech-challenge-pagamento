import {BadRequestException} from "@nestjs/common";

export enum StatusPagamento {
    PENDENTE = "PENDENTE",
    PAGO = "PAGO",
    REJEITADO = "REJEITADO",
    CANCELADO = "CANCELADO",
}

