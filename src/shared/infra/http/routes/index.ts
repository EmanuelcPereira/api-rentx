import { Router } from "express";

import { authenticationsRoutes } from "./authentication.routes";
import { carsRoutes } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { passwordRoutes } from "./password.routes";
import { rentalsRoutes } from "./rentals.routes";
import { specificationsRoutes } from "./specification.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/categories", categoriesRoutes);

router.use("/specifications", specificationsRoutes);

router.use("/users", usersRoutes);

router.use("/cars", carsRoutes);

router.use("/rentals", rentalsRoutes);

router.use("/password", passwordRoutes);

router.use(authenticationsRoutes);

export { router };
