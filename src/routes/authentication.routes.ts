import { Router } from "express";

import { AuthenticateUserController } from "../modules/accounts/useCases/AuthenticateUser/AuthenticateUserController";

const authenticationsRoutes = Router();

const authenticationsUserController = new AuthenticateUserController();

authenticationsRoutes.post("/sessions", authenticationsUserController.handle);

export { authenticationsRoutes };
