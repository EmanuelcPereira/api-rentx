import { Router } from "express";
import { v4 as uuid } from "uuid";

const categoriesRoutes = Router();

const categories = [];

categoriesRoutes.post("/categories", (req, res) => {
  const { name, description } = req.body;

  categories.push({
    name,
    description,
  });

  return res.status(201).send();
});

export { categoriesRoutes };
