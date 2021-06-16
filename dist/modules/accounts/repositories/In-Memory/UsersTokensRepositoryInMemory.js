"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersTokensRepositoryInMemory = void 0;

var _UserTokens = require("../../infra/typeorm/entities/UserTokens");

class UsersTokensRepositoryInMemory {
  constructor() {
    this.usersTokens = [];
  }

  async create({
    user_id,
    expires_date,
    refresh_token
  }) {
    const userTokens = new _UserTokens.UserTokens();
    Object.assign(userTokens, {
      user_id,
      expires_date,
      refresh_token
    });
    this.usersTokens.push(userTokens);
    return userTokens;
  }

  async findByUserIdAndRefreshToken(user_id, refresh_token) {
    const userToken = this.usersTokens.find(token => token.user_id === user_id && token.refresh_token === refresh_token);
    return userToken;
  }

  async deleteById(id) {
    this.usersTokens = this.usersTokens.filter(userToken => userToken.id !== id);
  }

  async findByRefreshToken(refresh_token) {
    return this.usersTokens.find(userToken => userToken.refresh_token === refresh_token);
  }

}

exports.UsersTokensRepositoryInMemory = UsersTokensRepositoryInMemory;