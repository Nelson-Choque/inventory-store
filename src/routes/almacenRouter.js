import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getProductById,
  getProducts,
} from "../controller/almacenController.js";

const routerAlmacen = Router();

routerAlmacen.get("/", getProducts);

routerAlmacen.get("/:id", getProductById);

routerAlmacen.post("/", createProduct);

routerAlmacen.put("/:id", editProduct);

routerAlmacen.delete("/:id", deleteProduct);

export default routerAlmacen;
