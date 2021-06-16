"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecificationsRepository = void 0;

var _typeorm = require("typeorm");

var _Specification = require("../entities/Specification");

class SpecificationsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Specification.Specification);
  }

  async create({
    name,
    description
  }) {
    const specification = this.ormRepository.create({
      name,
      description
    });
    await this.ormRepository.save(specification);
    return specification;
  }

  async findByName(name) {
    const specification = await this.ormRepository.findOne({
      name
    });
    return specification;
  }

  async findByIds(ids) {
    const allSpecifications = await this.ormRepository.findByIds(ids);
    return allSpecifications;
  }

}

exports.SpecificationsRepository = SpecificationsRepository;