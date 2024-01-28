import { StatusPedido } from "../../pedido/entities/StatusPedido";

export const IAtualizarStatusPedidoUseCase: unique symbol = Symbol("IAtualizarStatusPedidoUseCase");

export interface IAtualizarStatusPedidoUseCase {
    atualizarStatus(pedidoId: number, status: StatusPedido): Promise<void>;
}