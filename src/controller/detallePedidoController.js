import connection from "../db/connection.js";
import { DetallePedido } from "../model/DetallePedido.js";

export const getProducts = (req, res) => {
  connection.query("select * from detalle_pedido", (err, result) => {
    if (err) {
      throw "hubo un error: " + err;
      return "";
    }

    if (result.length === 0) {
      res.send("las DetallePedido estan vacias");
      return "";
    }

    res.send(result);
  });
};

export const getProductById = (req, res) => {
  const id = req.params.id;

  connection.query(
    "select * from detalle_pedido where cod_detalle_pedido = ?",
    [id],
    (err, result) => {
      if (err) throw "hubo un error en la consulta: " + err;

      if (result.length === 0) {
        res.send("no se encontraron datos con el id" + id);
        return "";
      }

      res.send(result);
    }
  );
};

export const createProduct = (req, res) => {
  try {
    const newDetallePedido = req.body;

    const detallePedido = new DetallePedido(
      newDetallePedido.codDetallePedido,
      newDetallePedido.cantidad,
      newDetallePedido.precioUnitario,
      newDetallePedido.codPedido,
      newDetallePedido.codProducto
    );

    connection.query(
      "INSERT INTO detalle_pedido (cantidad, precio_unitario, cod_pedido, cod_producto) VALUES (?, ?,?,?)",
      [
        detallePedido.cantidad,
        detallePedido.precioUnitario,
        detallePedido.cod_pedido,
        detallePedido.cod_producto,
      ],
      (err, result) => {
        if (err) {
          console.error("Error al insertar el detallePedido:", err);
          res
            .status(500)
            .send("Error al insertar el detallePedido en la base de datos");
          return "";
        }

        res.status(201).send("registro creado exitosamente");
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("parece que algo ha salido mal..");
  }
};

export const editProduct = (req, res) => {
  try {
    const id = req.params.id;

    const newDetallePedido = req.body;

    const detallePedido = new DetallePedido(
      newDetallePedido.codDetallePedido,
      newDetallePedido.cantidad,
      newDetallePedido.precioUnitario,
      newDetallePedido.codPedido,
      newDetallePedido.codProducto
    );

    console.log(id);
    connection.query(
      "UPDATE detalle_pedido SET cantidad = ?, precio_unitario = ?, cod_pedido = ?, cod_producto = ? WHERE cod_detalle_pedido = ?",
      [
        detallePedido.cantidad,
        detallePedido.precioUnitario,
        detallePedido.cod_pedido,
        detallePedido.cod_producto,
        id,
      ],
      (err, result, fields) => {
        if (err) {
          throw "no se pudo editar el detalle_pedido con id " + id;
          return "";
        }

        if (result.affectedRows === 0) {
          res
            .status(404)
            .send("no se encontro el detalle_pedido con id: " + id);
          return "";
        }
        res.status(204).send();
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("ocurrio un error..");
  }
};

export const deleteProduct = (req, res) => {
  try {
    const id = req.params.id;

    connection.query(
      "delete from detalle_pedido where cod_detalle_pedido = ?",
      [id],
      (err, result) => {
        if (err) throw "ocurrio un error : " + err;

        if (result.affectedRows === 0) {
          res
            .status(404)
            .send("no se pudo eliminar ningun registro con el id " + id);
          return "";
        }

        res.send({
          message: "eliminado con exito",
          result,
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("ocurrio un error");
  }
};
