"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoriesRepository = void 0;

var _typeorm = require("typeorm");

var _Category = require("../entities/Category");

class CategoriesRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Category.Category);
  }

  async create({
    name,
    description
  }) {
    const category = this.ormRepository.create({
      name,
      description
    });
    await this.ormRepository.save(category);
  }

  async list() {
    const categories = await this.ormRepository.find();
    return categories;
  }

  async findByName(name) {
    const category = await this.ormRepository.findOne({
      name
    });
    return category;
  }

}

exports.CategoriesRepository = CategoriesRepository;