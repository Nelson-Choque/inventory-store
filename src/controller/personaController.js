import connection from "../db/connection.js";

import express from "express";
import { Producto } from "../model/Producto.js";
import { Persona } from "../model/Persona.js";

export const getProducts = (req, res) => {
  connection.query("select * from persona", (err, result) => {
    if (err) {
      throw "hubo un error: " + err;
      return "";
    }

    if (result.length === 0) {
      res.send("las personas estan vacias");
      return "";
    }

    res.send(result);
  });
};

export const getProductById = (req, res) => {
  const id = req.params.id;

  connection.query(
    "select * from persona where cod_persona = ?",
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
    const newProduct = req.body;

    const persona = new Persona(
      newProduct.codPersona,
      newProduct.nombre,
      newProduct.apellidos,
      newProduct.dni,
      newProduct.direccion,
      newProduct.telefono,
      newProduct.email,
      newProduct.sexo,
      newProduct.fechaDeNacimiento
    );

    connection.query(
      "INSERT INTO persona (nombre, apellidos, dni, direccion,telefono,email,sexo,fecha_de_nacimiento) VALUES (?, ?, ?, ?,?,?,?,?)",
      [
        persona.nombre,
        persona.apellidos,
        persona.dni,
        persona.direccion,
        persona.telefono,
        persona.email,
        persona.sexo,
        persona.fechaDeNacimiento,
      ],
      (err, result) => {
        if (err) {
          console.error("Error al insertar el producto:", err);
          res
            .status(500)
            .send("Error al insertar el producto en la base de datos");
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

    const {
      codPersona,
      nombre,
      apellidos,
      dni,
      direccion,
      telefono,
      email,
      sexo,
      fechaDeNacimiento,
    } = req.body;
    console.log(req.body);
    const persona = new Persona(
      codPersona,
      nombre,
      apellidos,
      dni,
      direccion,
      telefono,
      email,
      sexo,
      fechaDeNacimiento
    );

    console.log(id);
    connection.query(
      "UPDATE persona SET nombre = ?, apellidos = ?, dni = ?, direccion = ?, telefono = ?, email = ?, sexo = ?, fecha_de_nacimiento = ? WHERE cod_persona = ?",
      [
        persona.nombre,
        persona.apellidos,
        persona.dni,
        persona.direccion,
        persona.telefono,
        persona.email,
        persona.sexo,
        persona.fechaDeNacimiento,
        id,
      ],
      (err, result, fields) => {
        if (err) {
          throw "no se pudo editar el producto con id " + id;
          return "";
        }

        if (result.affectedRows === 0) {
          res.status(404).send("no se encontro la persona con id: " + id);
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
      "delete from persona where cod_persona = ?",
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
