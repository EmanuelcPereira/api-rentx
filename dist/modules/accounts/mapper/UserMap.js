"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserMap = void 0;

var _classTransformer = require("class-transformer");

class UserMap {
  static toDto({
    name,
    id,
    email,
    driver_license,
    avatar,
    avatar_url
  }) {
    const user = (0, _classTransformer.classToClass)({
      email,
      id,
      name,
      driver_license,
      avatar,
      avatar_url
    });
    return user;
  }

}

exports.UserMap = UserMap;