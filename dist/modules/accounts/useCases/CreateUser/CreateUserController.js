"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserController = void 0;

var _tsyringe = require("tsyringe");

var _CreateUserUseCase = require("./CreateUserUseCase");

class CreateUserController {
  async handle(req, res) {
    const {
      name,
      password,
      email,
      driver_license
    } = req.body;

    const createUserUseCase = _tsyringe.container.resolve(_CreateUserUseCase.CreateUserUseCase);

    await createUserUseCase.execute({
      name,
      password,
      email,
      driver_license
    });
    return res.status(201).send();
  }

}

exports.CreateUserController = CreateUserController;