import connection from "../db/connection.js";

import express from "express";
import { Producto } from "../model/Producto.js";

export const getProducts = (req, res) => {
  connection.query("select * from producto", (err, result) => {
    if (err) {
      throw "hubo un error: " + err;
    }

    if (result.length === 0) {
      res.send("los productos estan vacios");
      return "";
    }
    console.log(result);

    res.send({ products: result });
  });
};

export const getProductById = (req, res) => {
  const id = req.params.id;

  connection.query(
    "select * from producto where cod_producto = ?",
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

    const producto = new Producto(
      newProduct.cod_producto,
      newProduct.nombre,
      newProduct.descripcion,
      newProduct.precio
    );

    connection.query(
      "INSERT INTO producto (nombre, descripcion, precio) VALUES (?, ?, ?)",
      [producto.nombre, producto.descripcion, producto.precio],
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

    const { cod_producto, nombre, descripcion, stock, precio } = req.body;

    const producto = new Producto(cod_producto, nombre, descripcion, precio);

    console.log(id);
    connection.query(
      "UPDATE producto SET nombre = ?, descripcion = ?, precio = ? WHERE cod_producto = ?",
      [producto.nombre, producto.descripcion, producto.precio, id],
      (err, result, fields) => {
        if (err) {
          throw "no se pudo editar el producto con id " + id;
          return "";
        }

        if (result.affectedRows === 0) {
          res.status(404).send("no se encontro el producto con id: " + id);
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
      "delete from producto where cod_producto = ?",
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
