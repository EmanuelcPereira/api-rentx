"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersTokensRepository = void 0;

var _typeorm = require("typeorm");

var _UserTokens = require("../entities/UserTokens");

class UsersTokensRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_UserTokens.UserTokens);
  }

  async create({
    user_id,
    expires_date,
    refresh_token
  }) {
    const userToken = this.ormRepository.create({
      user_id,
      expires_date,
      refresh_token
    });
    await this.ormRepository.save(userToken);
    return userToken;
  }

  async findByUserIdAndRefreshToken(user_id, refresh_token) {
    const userTokens = await this.ormRepository.findOne({
      user_id,
      refresh_token
    });
    return userTokens;
  }

  async deleteById(id) {
    await this.ormRepository.delete(id);
  }

  async findByRefreshToken(refresh_token) {
    const userToken = this.ormRepository.findOne({
      refresh_token
    });
    return userToken;
  }

}

exports.UsersTokensRepository = UsersTokensRepository;