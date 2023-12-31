import connection from "./db/connection.js";
import express from "express";
import routerProducto from "./routes/productRouter.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import cors from "cors";

import path from "path";
import routerPersona from "./routes/personaRouter.js";
import routerAlmacen from "./routes/almacenRouter.js";
import routerAlmacenProducto from "./routes/almacenProductoRouter.js";
import routerCliente from "./routes/clienteRouter.js";
import routerDetallePedido from "./routes/detallePedidoRouter.js";
import routerPedido from "./routes/pedidoRouter.js";
import routerStock from "./routes/stockRouter.js";
import routerUsuario from "./routes/usuarioRouter.js";
import routerTrabajador from "./routes/trabajadorRouter.js";
import routerLogout from "./routes/logoutRouter.js";

const app = express();

app.use(cors());

//configure swagger
console.info(`${path.join(import.meta.url)}`);
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Api backend Topitop2", version: "1.1.1" },
  },
  apis: ["./_build/openapi.yaml", "./src/routes/productRouter.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const PORT = process.env.PORT || 8090;

app.listen(PORT, () => console.info("escuchando en http://localhost:" + PORT));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  "/api-docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerSpec)
);

app.use("/producto", routerProducto);
app.use("/persona", routerPersona);
app.use("/almacen", routerAlmacen);
app.use("/almacen-producto", routerAlmacenProducto);
app.use("/cliente", routerCliente);
app.use("/detalle-pedido", routerDetallePedido);
app.use("/pedido", routerPedido);
app.use("/stock", routerStock);
app.use("/trabajador", routerTrabajador);
app.use("/usuario", routerUsuario);
app.use("/login", routerLogout);
