"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAdmin = ensureAdmin;

var _AppError = require("@errors/AppError");

var _UsersRepository = require("@modules/accounts/infra/typeorm/repositories/UsersRepository");

async function ensureAdmin(req, res, next) {
  const {
    id
  } = req.user;
  const usersRepository = new _UsersRepository.UsersRepository();
  const user = await usersRepository.findById(id);

  if (!user.isAdmin) {
    throw new _AppError.AppError("User is not admin");
  }

  return next();
}