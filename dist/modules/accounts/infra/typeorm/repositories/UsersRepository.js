"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersRepository = void 0;

var _typeorm = require("typeorm");

var _User = require("../entities/User");

class UsersRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_User.User);
  }

  async create({
    name,
    password,
    email,
    driver_license,
    id,
    avatar
  }) {
    const user = this.ormRepository.create({
      name,
      password,
      email,
      driver_license,
      id,
      avatar
    });
    await this.ormRepository.save(user);
  }

  async findByEmail(email) {
    const user = await this.ormRepository.findOne({
      email
    });
    return user;
  }

  async findById(id) {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

}

exports.UsersRepository = UsersRepository;