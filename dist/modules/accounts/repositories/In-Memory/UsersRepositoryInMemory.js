"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersRepositoryInMemory = void 0;

var _User = require("@modules/accounts/infra/typeorm/entities/User");

var _uuid = require("uuid");

class UsersRepositoryInMemory {
  constructor() {
    this.users = [];
  }

  async create({
    driver_license,
    name,
    email,
    password
  }) {
    const user = new _User.User();
    user.id = (0, _uuid.v4)();
    user.name = name;
    user.email = email;
    user.password = password;
    user.driver_license = driver_license;
    this.users.push(user);
  }

  async findByEmail(email) {
    return this.users.find(user => user.email === email);
  }

  async findById(id) {
    return this.users.find(user => user.id === id);
  }

}

exports.UsersRepositoryInMemory = UsersRepositoryInMemory;