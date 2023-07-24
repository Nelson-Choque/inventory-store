import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getProductById,
  getProducts,
} from "../controller/stockController.js";

const routerStock = Router();

routerStock.get("/", getProducts);

routerStock.get("/:id", getProductById);

routerStock.post("/", createProduct);

routerStock.put("/:id", editProduct);

routerStock.delete("/:id", deleteProduct);

export default routerStock;
