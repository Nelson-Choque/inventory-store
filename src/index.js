import connection from "./db/connection.js";
import express from 'express'
import routerProducto from "./routes/productRouter.js";

const app = express();

const PORT = process.env.PORT || 8090;

app.listen(PORT);

app.use("/producto",routerProducto);

