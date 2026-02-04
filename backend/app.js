import express from "express";

import ProductRouter from "./routes/product.routes.js";
import UnitRouter from "./routes/unit.routes.js";
import WarehouseRouter from "./routes/warehouse.routes.js";
import ActivityRouter from "./routes/activity.routes.js";

import logger from "./middleware/logger.js";

const app = express();

app.use(express.json());
app.use(logger);

app.use("/api/v1/products", ProductRouter);
app.use("/api/v1/units", UnitRouter);
app.use("/api/v1/warehouses", WarehouseRouter);
app.use("/api/v1/activities", ActivityRouter);

export default app;