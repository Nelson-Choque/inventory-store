import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getProductById,
  getProducts,
} from "../controller/pedidoController.js";

const routerPedido = Router();

routerPedido.get("/", getProducts);

routerPedido.get("/:id", getProductById);

routerPedido.post("/", createProduct);

routerPedido.put("/:id", editProduct);

routerPedido.delete("/:id", deleteProduct);

export default routerPedido;
