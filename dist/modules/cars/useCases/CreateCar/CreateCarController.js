"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCarController = void 0;

var _tsyringe = require("tsyringe");

var _CreateCarUseCase = require("./CreateCarUseCase");

class CreateCarController {
  async handle(req, res) {
    const {
      name,
      description,
      brand,
      daily_rate,
      fine_amount,
      category_id,
      license_plate
    } = req.body;

    const createCarUseCase = _tsyringe.container.resolve(_CreateCarUseCase.CreateCarUseCase);

    const car = await createCarUseCase.execute({
      name,
      description,
      brand,
      daily_rate,
      fine_amount,
      category_id,
      license_plate
    });
    return res.status(201).json(car);
  }

}

exports.CreateCarController = CreateCarController;