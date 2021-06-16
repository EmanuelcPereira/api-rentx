"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepository = void 0;

var _typeorm = require("typeorm");

var _Car = require("../entities/Car");

class CarsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Car.Car);
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications
  }) {
    const car = this.ormRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications
    });
    await this.ormRepository.save(car);
    return car;
  }

  async findByLicensePlate(license_plate) {
    const car = await this.ormRepository.findOne({
      license_plate
    });
    return car;
  }

  async findAvailable(name, category_id, brand) {
    const carsQuery = this.ormRepository.createQueryBuilder("c").where("available = :available", {
      available: true
    });

    if (brand) {
      carsQuery.andWhere("brand = :brand", {
        brand
      });
    }

    if (name) {
      carsQuery.andWhere("name = :name", {
        name
      });
    }

    if (category_id) {
      carsQuery.andWhere("category_id = :category_id", {
        category_id
      });
    }

    const cars = await carsQuery.getMany();
    return cars;
  }

  async findById(id) {
    const car = await this.ormRepository.findOne(id);
    return car;
  }

  async updateAvailable(id, available) {
    await this.ormRepository.createQueryBuilder().update().set({
      available
    }).where("id = :id").setParameters({
      id
    }).execute();
  }

}

exports.CarsRepository = CarsRepository;