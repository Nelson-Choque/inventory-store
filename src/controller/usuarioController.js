import connection from "../db/connection.js";
import { Usuario } from "../model/Usuario.js";

export const getProducts = (req, res) => {
  connection.query("select * from usuario", (err, result) => {
    if (err) {
      throw "hubo un error: " + err;
      return "";
    }

    if (result.length === 0) {
      res.send("las usuarios estan vacias");
      return "";
    }

    res.send(result);
  });
};

export const getProductById = (req, res) => {
  const id = req.params.id;

  connection.query(
    "select * from usuario where cod_usuario = ?",
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
    const newUsuario = req.body;

    const usuario = new Usuario(
      newUsuario.codUsuario,
      newUsuario.username,
      newUsuario.password,
      newUsuario.role,
      newUsuario.codPersona
    );

    connection.query(
      "INSERT INTO usuario (username, password,role,cod_persona) VALUES (?, ?,?,?)",
      [usuario.username, usuario.password, usuario.role, usuario.codPersona],
      (err, result) => {
        if (err) {
          console.error("Error al insertar el usuario:", err);
          res
            .status(500)
            .send("Error al insertar el usuario en la base de datos");
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

    const newUsuario = req.body;

    const usuario = new Usuario(
      newUsuario.codUsuario,
      newUsuario.username,
      newUsuario.password,
      newUsuario.role,
      newUsuario.codPersona
    );

    console.log(id);
    connection.query(
      "UPDATE usuario SET username = ?, password = ?, role = ?, cod_persona = ? WHERE cod_usuario = ?",
      [
        newUsuario.username,
        newUsuario.password,
        newUsuario.role,
        newUsuario.codPersona,
        id,
      ],
      (err, result, fields) => {
        if (err) {
          throw "no se pudo editar el usuario con id " + id;
          return "";
        }

        if (result.affectedRows === 0) {
          res.status(404).send("no se encontro el usuario con id: " + id);
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
      "delete from usuario where cod_usuario = ?",
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
