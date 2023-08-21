import { Persona } from "../model/Persona.js";
import { Usuario } from "../model/Usuario.js";
import connection from "../db/connection.js";

export const registerUser = async (req, res) => {
  try {
    const newUser = req.body;

    const persona = new Persona(
      newUser.codPersona,
      newUser.nombre,
      newUser.apellidos,
      newUser.dni,
      newUser.direccion,
      newUser.telefono,
      newUser.email,
      newUser.sexo,
      newUser.fechaDeNacimiento
    );

    console.log(newUser);

    connection.query(
      "INSERT INTO persona (nombre, apellidos,dni) VALUES (?, ?,?)",
      [persona.nombre, persona.apellidos, persona.dni],
      async (err, result, fields) => {
        if (err) {
          console.error("Error al insertar el producto:", err);
          res
            .status(500)
            .send("Error al insertar el producto en la base de datos");
          return "";
        }

        try {
          const personaQuery = await connection
            .promise()
            .execute("SELECT cod_persona FROM persona WHERE dni = ?", [
              persona.dni,
            ]);

          // Si la consulta devuelve algún resultado, obtenemos el ID de la persona
          let codPersona;
          if (personaQuery[0].length > 0) {
            codPersona = personaQuery[0][0].cod_persona;
          }

          console.log({ message: codPersona });

          const usuario = new Usuario(
            "",
            newUser.username,
            newUser.password,
            "user",
            codPersona
          );

          connection.query(
            "INSERT INTO usuario (username, password,role,cod_persona) VALUES (?, ?,?,?)",
            [
              usuario.username,
              usuario.password,
              usuario.role,
              usuario.codPersona,
            ],
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
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("parece que algo ha salido mal..");
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  console.log({ username, password });

  connection.query(
    "select * from usuario where username = ? && password = ?",
    [username, password],
    (err, result) => {
      console.log(result);

      if (err) throw "hubo un error en la consulta: " + err;

      if (result.length === 0) {
        res.send({ result: false, message: "no es valido" });
        return "";
      }

      res.send({ result: true, message: "es valido", data: result });
    }
  );
};
