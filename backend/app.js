import express from "express";
import cors from "cors";
import "dotenv/config";

import ProductRouter from "./routes/product.routes.js";
import UnitRouter from "./routes/unit.routes.js";
import WarehouseRouter from "./routes/warehouse.routes.js";
import ActivityRouter from "./routes/activity.routes.js";

import logger from "./middleware/logger.js";

const app = express();
const allowedOrigins = process.env.WHITELIST;

app.use(cors({
    origin: allowedOrigins
}));
app.use(express.json());
app.use(logger);

app.use("/api/v1/products", ProductRouter);
app.use("/api/v1/units", UnitRouter);
app.use("/api/v1/warehouses", WarehouseRouter);
app.use("/api/v1/activities", ActivityRouter);

export default app;