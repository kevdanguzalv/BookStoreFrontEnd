export interface ListPedidosRequest {
    pedido: number
    nombres: string;
    apellidos: string;
    libro: string;
    autor: string;
    isbn: string;
}

export interface PedidoRequest {
    fechaPedido: Date,
    clienteId: number;
    LibrosId : number [];
}

