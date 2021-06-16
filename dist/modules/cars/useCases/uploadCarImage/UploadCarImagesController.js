"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploadCarImagesController = void 0;

var _tsyringe = require("tsyringe");

var _UploadCarImageUseCase = require("./UploadCarImageUseCase");

class UploadCarImagesController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const images = req.files;

    const uploadCarImageUseCase = _tsyringe.container.resolve(_UploadCarImageUseCase.UploadCarImageUseCase);

    const images_name = images.map(file => file.filename);
    await uploadCarImageUseCase.execute({
      car_id: id,
      images_name
    });
    return res.status(201).send();
  }

}

exports.UploadCarImagesController = UploadCarImagesController;