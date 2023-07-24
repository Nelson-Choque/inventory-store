import connection from "../db/connection.js";
import { Stock } from "../model/Stock.js";

export const getProducts = (req, res) => {
  connection.query("select * from stock", (err, result) => {
    if (err) {
      throw "hubo un error: " + err;
      return "";
    }

    if (result.length === 0) {
      res.send("las stock estan vacias");
      return "";
    }

    res.send(result);
  });
};

export const getProductById = (req, res) => {
  const id = req.params.id;

  connection.query(
    "select * from stock where cod_stock = ?",
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
    const newStock = req.body;

    const stock = new Stock(
      newStock.codStock,
      newStock.cantidadMaxima,
      newStock.cantidadMinima,
      newStock.codigoAlmacen
    );

    connection.query(
      "INSERT INTO stock (cantidad_maxima, cantidad_minima,cod_almacen) VALUES (?, ?,?)",
      [stock.cantidadMaxima, stock.cantidadMinima, stock.codAlmacen],
      (err, result) => {
        if (err) {
          console.error("Error al insertar el stock:", err);
          res
            .status(500)
            .send("Error al insertar el stock en la base de datos");
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

    const newStock = req.body;

    const stock = new Stock(
      newStock.codStock,
      newStock.cantidadMaxima,
      newStock.cantidadMinima,
      newStock.codigoAlmacen
    );

    console.log(id);
    connection.query(
      "UPDATE stock SET cantidad_maxima = ?, cantidad_minima = ?, cod_almacen = ? WHERE cod_stock = ?",
      [stock.cantidadMaxima, stock.cantidadMinima, stock.codAlmacen, id],
      (err, result, fields) => {
        if (err) {
          throw "no se pudo editar el stock con id " + id;
          return "";
        }

        if (result.affectedRows === 0) {
          res.status(404).send("no se encontro el stock con id: " + id);
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
      "delete from stock where cod_stock = ?",
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
