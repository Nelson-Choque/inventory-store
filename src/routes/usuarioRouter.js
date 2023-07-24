import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getProductById,
  getProducts,
} from "../controller/usuarioController.js";

const routerUsuario = Router();

routerUsuario.get("/", getProducts);

routerUsuario.get("/:id", getProductById);

routerUsuario.post("/", createProduct);

routerUsuario.put("/:id", editProduct);

routerUsuario.delete("/:id", deleteProduct);

export default routerUsuario;
