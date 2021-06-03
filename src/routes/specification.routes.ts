import { Router } from "express";

import { SpecificationsRepository } from "../modules/cars/repositories/SpecificationsRepository";
import { CreateSpecificationsService } from "../modules/cars/services/CreateSpecificationsService";

const specificationsRoutes = Router();

const specificationsRepository = new SpecificationsRepository();

specificationsRoutes.post("/", (req, res) => {
  const { name, description } = req.body;

  const createSpecifications = new CreateSpecificationsService(
    specificationsRepository
  );

  createSpecifications.execute({ name, description });

  return res.status(201).send();
});

export { specificationsRoutes };
