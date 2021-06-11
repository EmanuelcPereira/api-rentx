import { CreateRentalController } from "@modules/rentals/useCases/CreateRental/CreateRentalController";
import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const createRentalsController = new CreateRentalController();
const rentalsRoutes = Router();

rentalsRoutes.post("/", ensureAuthenticated, createRentalsController.handle);

export { rentalsRoutes };
