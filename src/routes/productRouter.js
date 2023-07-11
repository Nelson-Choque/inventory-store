import { Router } from "express";
import { getProducts } from "../controller/productController.js";

const routerProducto = Router();

routerProducto.get("/", getProducts)


export default routerProducto;
