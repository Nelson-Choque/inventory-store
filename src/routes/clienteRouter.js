import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getProductById,
  getProducts,
} from "../controller/clienteController.js";

const routerCliente = Router();

routerCliente.get("/", getProducts);

routerCliente.get("/:id", getProductById);

routerCliente.post("/", createProduct);

routerCliente.put("/:id", editProduct);

routerCliente.delete("/:id", deleteProduct);

export default routerCliente;
