import connection from "../db/connection.js";
import { Cliente } from "../model/Cliente.js";

export const getProducts = (req, res) => {
  connection.query("select * from cliente", (err, result) => {
    if (err) {
      throw "hubo un error: " + err;
      return "";
    }

    if (result.length === 0) {
      res.send("las Cliente estan vacias");
      return "";
    }

    res.send(result);
  });
};

export const getProductById = (req, res) => {
  const id = req.params.id;

  connection.query(
    "select * from cliente where cod_cliente = ?",
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
    const newCliente = req.body;

    const cliente = new Cliente(
      newCliente.codCliente,
      newCliente.codPersona,
      newCliente.estado
    );

    connection.query(
      "INSERT INTO cliente (estado, cod_persona) VALUES (?, ?)",
      [cliente.estado, cliente.codPersona],
      (err, result) => {
        if (err) {
          console.error("Error al insertar el cliente:", err);
          res
            .status(500)
            .send("Error al insertar el cliente en la base de datos");
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

    const newCliente = req.body;

    const cliente = new Cliente(
      newCliente.codCliente,
      newCliente.estado,
      newCliente.codPersona
    );
    console.log(id);
    connection.query(
      "UPDATE almacen SET estado = ?, cod_persona = ? WHERE cod_cliente = ?",
      [cliente.estado, cliente.codPersona, id],
      (err, result, fields) => {
        if (err) {
          throw "no se pudo editar el cliente con id " + id;
          return "";
        }

        if (result.affectedRows === 0) {
          res.status(404).send("no se encontro el cliente con id: " + id);
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
      "delete from cliente where cod_cliente = ?",
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
