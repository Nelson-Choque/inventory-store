import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getProductById,
  getProducts,
} from "../controller/detallePedidoController.js";

const routerDetallePedido = Router();

routerDetallePedido.get("/", getProducts);

routerDetallePedido.get("/:id", getProductById);

routerDetallePedido.post("/", createProduct);

routerDetallePedido.put("/:id", editProduct);

routerDetallePedido.delete("/:id", deleteProduct);

export default routerDetallePedido;
