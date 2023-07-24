import connection from "../db/connection.js";
import { Pedido } from "../model/Pedido.js";

export const getProducts = (req, res) => {
  connection.query("select * from pedido", (err, result) => {
    if (err) {
      throw "hubo un error: " + err;
      return "";
    }

    if (result.length === 0) {
      res.send("las pedido estan vacias");
      return "";
    }

    res.send(result);
  });
};

export const getProductById = (req, res) => {
  const id = req.params.id;

  connection.query(
    "select * from pedido where cod_pedido = ?",
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

    const pedido = new Pedido(
      newDetallePedido.codPedido,
      newDetallePedido.fechaPedido,
      newDetallePedido.codCliente
    );

    connection.query(
      "INSERT INTO pedido (fecha_pedido, cod_cliente) VALUES (?, ?)",
      [pedido.fechaPedido, pedido.codCliente],
      (err, result) => {
        if (err) {
          console.error("Error al insertar el pedido:", err);
          res
            .status(500)
            .send("Error al insertar el pedido en la base de datos");
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

    const pedido = new Pedido(
      newDetallePedido.codPedido,
      newDetallePedido.fechaPedido,
      newDetallePedido.codCliente
    );

    console.log(id);
    connection.query(
      "UPDATE pedido SET fecha_pedido = ?, cod_cliente = ? WHERE cod_pedido = ?",
      [pedido.fechaPedido, pedido.codCliente, id],
      (err, result, fields) => {
        if (err) {
          throw "no se pudo editar el pedido con id " + id;
          return "";
        }

        if (result.affectedRows === 0) {
          res.status(404).send("no se encontro el pedido con id: " + id);
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
      "delete from pedido where cod_pedido = ?",
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
