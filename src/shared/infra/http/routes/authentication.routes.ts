import { AuthenticateUserController } from "@modules/accounts/useCases/AuthenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "@modules/accounts/useCases/RefreshToken/RefreshTokenController";
import { Router } from "express";

const authenticationsRoutes = Router();

const authenticationsUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticationsRoutes.post("/sessions", authenticationsUserController.handle);
authenticationsRoutes.post("/refresh-token", refreshTokenController.handle);

export { authenticationsRoutes };
