import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getProductById,
  getProducts,
} from "../controller/productController.js";

const routerProducto = Router();

routerProducto.get("/", getProducts);

routerProducto.get("/:id", getProductById);

routerProducto.post("/", createProduct);

routerProducto.put("/:id", editProduct);

routerProducto.delete("/:id", deleteProduct);

export default routerProducto;
