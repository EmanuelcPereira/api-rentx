"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoriesRepositoryInMemory = void 0;

var _Category = require("@modules/cars/infra/typeorm/entities/Category");

var _uuid = require("uuid");

class CategoriesRepositoryInMemory {
  constructor() {
    this.categories = [];
  }

  async findByName(name) {
    const category = this.categories.find(category => category.name === name);
    return category;
  }

  async list() {
    const category = this.categories;
    return category;
  }

  async create({
    name,
    description
  }) {
    const category = new _Category.Category();
    category.id = (0, _uuid.v4)();
    category.name = name;
    category.description = description;
    this.categories.push(category);
  }

}

exports.CategoriesRepositoryInMemory = CategoriesRepositoryInMemory;