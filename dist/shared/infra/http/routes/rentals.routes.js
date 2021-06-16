"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rentalsRoutes = void 0;

var _CreateRentalController = require("@modules/rentals/useCases/CreateRental/CreateRentalController");

var _DevolutionRentalController = require("@modules/rentals/useCases/devolutionRental/DevolutionRentalController");

var _listRentalsByUserController = require("@modules/rentals/useCases/listRentalsByUser/listRentalsByUserController");

var _express = require("express");

var _ensureAuthenticated = require("@shared/infra/http/middlewares/ensureAuthenticated");

const createRentalsController = new _CreateRentalController.CreateRentalController();
const devolutionRentalController = new _DevolutionRentalController.DevolutionRentalController();
const listRentalsByUserController = new _listRentalsByUserController.ListRentalsByUserController();
const rentalsRoutes = (0, _express.Router)();
exports.rentalsRoutes = rentalsRoutes;
rentalsRoutes.post("/", _ensureAuthenticated.ensureAuthenticated, createRentalsController.handle);
rentalsRoutes.post("/devolution/:id", _ensureAuthenticated.ensureAuthenticated, devolutionRentalController.handle);
rentalsRoutes.get("/user", _ensureAuthenticated.ensureAuthenticated, listRentalsByUserController.handle);