import express from "express";

import { categoriesRoutes } from "./routes/categories.routes";
import { specificationsRoutes } from "./routes/specification.routes";

const app = express();
const port = 3333;

app.use(express.json());

app.use("/categories", categoriesRoutes);

app.use("/specifications", specificationsRoutes);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
