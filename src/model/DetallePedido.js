export class DetallePedido {
  constructor(
    codDetallePedido,
    cantidad,
    precioUnitario,
    cod_pedido,
    cod_producto
  ) {
    this.codDetallePedido = codDetallePedido;
    this.cantidad = cantidad;
    this.precioUnitario = precioUnitario;
    this.cod_pedido = cod_pedido;
    this.cod_producto = cod_producto;
  }
}
