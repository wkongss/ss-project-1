import app from "./app.js";
import "dotenv/config";

import dbConnect from "./config/db.js";

const port = process.env.PORT ?? "8080";

await dbConnect();

app.listen(port, () => {
    console.log(`Currently listening on port ${port}.`);
});