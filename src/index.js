import connection from "./db/connection.js";
import express from "express";
import routerProducto from "./routes/productRouter.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import cors from "cors";

import path from "path";

const app = express();

app.use(cors());

//configure swagger
console.info(`${path.join(import.meta.url)}`);
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Api backend Topitop", version: "1.1.1" },
  },
  apis: ["./docs/swagger.yaml", "./src/routes/productRouter.js"],
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
