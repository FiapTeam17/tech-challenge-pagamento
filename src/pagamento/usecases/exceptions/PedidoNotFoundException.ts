
export class PedidoNotFoundException {
    public readonly code = "sgr.pedidoNotFound";
    public readonly message = "Pedido não foi encontrado";
    public readonly httpStatus = 404;
}