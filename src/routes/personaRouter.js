import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getProductById,
  getProducts,
} from "../controller/personaController.js";

const routerPersona = Router();

routerPersona.get("/", getProducts);

routerPersona.get("/:id", getProductById);

routerPersona.post("/", createProduct);

routerPersona.put("/:id", editProduct);

routerPersona.delete("/:id", deleteProduct);
routerPersona.delete("/a/a", deleteProduct);

export default routerPersona;
