"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListRentalsByUserController = void 0;

var _tsyringe = require("tsyringe");

var _listRentalsByUserUseCase = require("./listRentalsByUserUseCase");

class ListRentalsByUserController {
  async handle(req, res) {
    const {
      id
    } = req.user;

    const listRentalsByUserUseCase = _tsyringe.container.resolve(_listRentalsByUserUseCase.ListRentalsByUserUseCase);

    const rentals = await listRentalsByUserUseCase.execute(id);
    return res.json(rentals);
  }

}

exports.ListRentalsByUserController = ListRentalsByUserController;