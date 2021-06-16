"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateUserAvatarController = void 0;

var _tsyringe = require("tsyringe");

var _UpdateUserAvatarUseCase = require("./UpdateUserAvatarUseCase");

class UpdateUserAvatarController {
  async handle(req, res) {
    const {
      id
    } = req.user;
    const avatarFile = req.file.filename;

    const uploadUserAvatarUseCase = _tsyringe.container.resolve(_UpdateUserAvatarUseCase.UpdateUserAvatarUseCase);

    await uploadUserAvatarUseCase.execute({
      user_id: id,
      avatarFile
    });
    return res.status(204).send();
  }

}

exports.UpdateUserAvatarController = UpdateUserAvatarController;