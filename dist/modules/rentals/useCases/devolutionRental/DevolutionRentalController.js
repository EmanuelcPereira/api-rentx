"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DevolutionRentalController = void 0;

var _tsyringe = require("tsyringe");

var _DevolutionRentalUseCase = require("./DevolutionRentalUseCase");

class DevolutionRentalController {
  async handle(req, res) {
    const {
      id
    } = req.user;
    const {
      rental_id
    } = req.params;

    const devolutionRentalUseCase = _tsyringe.container.resolve(_DevolutionRentalUseCase.DevolutionRentalUseCase);

    const rental = await devolutionRentalUseCase.execute({
      user_id: id,
      rental_id
    });
    return res.status(200).json(rental);
  }

}

exports.DevolutionRentalController = DevolutionRentalController;