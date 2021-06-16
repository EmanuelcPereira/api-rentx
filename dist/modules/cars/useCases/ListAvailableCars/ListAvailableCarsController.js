"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAvailableCarsController = void 0;

var _tsyringe = require("tsyringe");

var _ListAvailableCarsUseCase = require("./ListAvailableCarsUseCase");

class ListAvailableCarsController {
  async handle(req, res) {
    const {
      brand,
      name,
      category_id
    } = req.query;

    const listAvailableCarUseCase = _tsyringe.container.resolve(_ListAvailableCarsUseCase.ListAvailableCarsUseCase);

    const cars = await listAvailableCarUseCase.execute({
      brand: brand,
      name: name,
      category_id: category_id
    });
    return res.json(cars);
  }

}

exports.ListAvailableCarsController = ListAvailableCarsController;