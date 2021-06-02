import { Router } from "express";

import { CategoriesRepository } from "../repositories/CategoriesRepository";
import { CreatecategoryService } from "../services/CreateCategoryService";

const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (req, res) => {
  const { name, description } = req.body;

  const createCategory = new CreatecategoryService(categoriesRepository);

  createCategory.execute({ name, description });

  return res.status(201).send();
});

categoriesRoutes.get("/", (req, res) => {
  const all = categoriesRepository.list();

  return res.status(201).json(all);
});

export { categoriesRoutes };
