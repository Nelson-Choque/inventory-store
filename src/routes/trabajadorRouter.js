import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getProductById,
  getProducts,
} from "../controller/trabajadorController.js";

const routerTrabajador = Router();

routerTrabajador.get("/", getProducts);

routerTrabajador.get("/:id", getProductById);

routerTrabajador.post("/", createProduct);

routerTrabajador.put("/:id", editProduct);

routerTrabajador.delete("/:id", deleteProduct);

export default routerTrabajador;
