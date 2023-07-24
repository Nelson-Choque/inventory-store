import connection from "../db/connection.js";
import { Almacen } from "../model/Almacen.js";

export const getProducts = (req, res) => {
  connection.query("select * from almacen", (err, result) => {
    if (err) {
      throw "hubo un error: " + err;
      return "";
    }

    if (result.length === 0) {
      res.send("las almacenes estan vacias");
      return "";
    }

    res.send(result);
  });
};

export const getProductById = (req, res) => {
  const id = req.params.id;

  connection.query(
    "select * from almacen where cod_persona = ?",
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
    const newAlmacen = req.body;

    const almacen = new Almacen(
      newAlmacen.codAlmacen,
      newAlmacen.nombre,
      newAlmacen.direccion
    );

    connection.query(
      "INSERT INTO almacen (nombre, direccion) VALUES (?, ?)",
      [almacen.nombre, almacen.direccion],
      (err, result) => {
        if (err) {
          console.error("Error al insertar el ALMACEN:", err);
          res
            .status(500)
            .send("Error al insertar el ALMACEN en la base de datos");
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

    const newAlmacen = req.body;

    const almacen = new Almacen(
      newAlmacen.codAlmacen,
      newAlmacen.nombre,
      newAlmacen.direccion
    );

    console.log(id);
    connection.query(
      "UPDATE almacen SET nombre = ?, direccion = ? WHERE cod_almacen = ?",
      [almacen.nombre, almacen.direccion, id],
      (err, result, fields) => {
        if (err) {
          throw "no se pudo editar el almacen con id " + id;
          return "";
        }

        if (result.affectedRows === 0) {
          res.status(404).send("no se encontro el almacen con id: " + id);
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
      "delete from almacen where cod_almacen = ?",
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
