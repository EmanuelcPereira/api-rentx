import { AuthenticateUserController } from "@modules/accounts/useCases/AuthenticateUser/AuthenticateUserController";
import { Router } from "express";

const authenticationsRoutes = Router();

const authenticationsUserController = new AuthenticateUserController();

authenticationsRoutes.post("/sessions", authenticationsUserController.handle);

export { authenticationsRoutes };
