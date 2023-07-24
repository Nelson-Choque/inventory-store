import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getProductById,
  getProducts,
} from "../controller/almacenProductoController.js";

const routerAlmacenProducto = Router();

routerAlmacenProducto.get("/", getProducts);

routerAlmacenProducto.get("/:id", getProductById);

routerAlmacenProducto.post("/", createProduct);

routerAlmacenProducto.put("/:id", editProduct);

routerAlmacenProducto.delete("/:id", deleteProduct);

export default routerAlmacenProducto;
