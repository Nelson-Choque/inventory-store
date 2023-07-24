import connection from "../db/connection.js";
import { Trabajador } from "../model/Trabajador.js";

export const getProducts = (req, res) => {
  connection.query("select * from trabajador", (err, result) => {
    if (err) {
      throw "hubo un error: " + err;
      return "";
    }

    if (result.length === 0) {
      res.send("las trabajador estan vacias");
      return "";
    }

    res.send(result);
  });
};

export const getProductById = (req, res) => {
  const id = req.params.id;

  connection.query(
    "select * from trabajador where cod_trabajador = ?",
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
    const newTrabajador = req.body;

    const trabajador = new Trabajador(
      newTrabajador.codTrabajador,
      newTrabajador.especialidad,
      newTrabajador.sueldo,
      newTrabajador.codPersona,
      newTrabajador.codAlmacen
    );

    connection.query(
      "INSERT INTO trabajador (especialidad, sueldo,cod_persona,cod_almacen) VALUES (?, ?,?,?)",
      [
        trabajador.especialidad,
        trabajador.sueldo,
        trabajador.codPersona,
        trabajador.codAlmacen,
      ],
      (err, result) => {
        if (err) {
          console.error("Error al insertar el trabajador:", err);
          res
            .status(500)
            .send("Error al insertar el trabajador en la base de datos");
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

    const newTrabajador = req.body;

    const trabajador = new Trabajador(
      newTrabajador.codTrabajador,
      newTrabajador.especialidad,
      newTrabajador.sueldo,
      newTrabajador.codPersona,
      newTrabajador.codAlmacen
    );

    console.log(id);
    connection.query(
      "UPDATE trabajador SET especialidad = ?, sueldo = ?, cod_persona = ?, cod_almacen = ? WHERE cod_trabajador = ?",
      [
        trabajador.especialidad,
        trabajador.sueldo,
        trabajador.codPersona,
        trabajador.codAlmacen,
        id,
      ],
      (err, result, fields) => {
        if (err) {
          throw "no se pudo editar el trabajador con id " + id;
          return "";
        }

        if (result.affectedRows === 0) {
          res.status(404).send("no se encontro el trabajador con id: " + id);
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
      "delete from trabajador where cod_trabajador = ?",
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
