import connection from "../db/connection.js";
import { AlmacenProducto } from "../model/AlmacenProducto.js";

export const getProducts = (req, res) => {
  connection.query("select * from almacen_producto", (err, result) => {
    if (err) {
      throw "hubo un error: " + err;
      return "";
    }

    if (result.length === 0) {
      res.send("el almacen_producto esta vacio");
      return "";
    }

    res.send(result);
  });
};

export const getProductById = (req, res) => {
  const id = req.params.id;

  connection.query(
    "select * from almacen_producto where cod_almacen_producto = ?",
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
    const newAlmacenProducto = req.body;

    const almacenProducto = new AlmacenProducto(
      newAlmacenProducto.codAlmacenProducto,
      newAlmacenProducto.stock,
      newAlmacenProducto.codAlmacen,
      newAlmacenProducto.codProducto
    );

    connection.query(
      "INSERT INTO almacen_producto (stock, cod_almacen, cod_producto) VALUES (?, ?,?)",
      [
        almacenProducto.stock,
        almacenProducto.codProducto,
        almacenProducto.codAlmacen,
      ],
      (err, result) => {
        if (err) {
          console.error("Error al insertar el ALMACEN_PRODUCTO:", err);
          res
            .status(500)
            .send("Error al insertar el ALMACEN_PRODUCTO en la base de datos");
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

    const newAlmacenProducto = req.body;

    const almacenProducto = new AlmacenProducto(
      newAlmacenProducto.codAlmacenProducto,
      newAlmacenProducto.stock,
      newAlmacenProducto.codAlmacen,
      newAlmacenProducto.codProducto
    );

    console.log(id);
    connection.query(
      "UPDATE almacen_producto SET stock = ?, cod_producto = ?, cod_almacen = ? WHERE cod_almacen_producto = ?",
      [
        almacenProducto.stock,
        almacenProducto.codProducto,
        almacenProducto.codAlmacen,
        id,
      ],
      (err, result, fields) => {
        if (err) {
          throw "no se pudo editar el almacen_producto con id " + id;
          return "";
        }

        if (result.affectedRows === 0) {
          res
            .status(404)
            .send("no se encontro el almacen_producto con id: " + id);
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
      "delete from almacen_producto where cod_almacen_producto = ?",
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
