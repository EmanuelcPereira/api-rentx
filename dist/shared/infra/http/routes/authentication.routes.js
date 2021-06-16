"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticationsRoutes = void 0;

var _AuthenticateUserController = require("@modules/accounts/useCases/AuthenticateUser/AuthenticateUserController");

var _RefreshTokenController = require("@modules/accounts/useCases/RefreshToken/RefreshTokenController");

var _express = require("express");

const authenticationsRoutes = (0, _express.Router)();
exports.authenticationsRoutes = authenticationsRoutes;
const authenticationsUserController = new _AuthenticateUserController.AuthenticateUserController();
const refreshTokenController = new _RefreshTokenController.RefreshTokenController();
authenticationsRoutes.post("/sessions", authenticationsUserController.handle);
authenticationsRoutes.post("/refresh-token", refreshTokenController.handle);