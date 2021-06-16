"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RentalsRepository = void 0;

var _typeorm = require("typeorm");

var _Rental = require("../entities/Rental");

class RentalsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Rental.Rental);
  }

  async create({
    car_id,
    expected_return_date,
    user_id,
    id,
    end_date,
    total
  }) {
    const rental = this.ormRepository.create({
      car_id,
      user_id,
      expected_return_date,
      id,
      end_date,
      total
    });
    await this.ormRepository.save(rental);
    return rental;
  }

  async findOpenRentalByCar(car_id) {
    const openByCar = await this.ormRepository.findOne({
      where: {
        car_id,
        end_date: null
      }
    });
    return openByCar;
  }

  async findOpenRentalByUser(user_id) {
    const openByUser = await this.ormRepository.findOne({
      where: {
        user_id,
        end_date: null
      }
    });
    return openByUser;
  }

  async findById(rental_id) {
    const rental = await this.ormRepository.findOne(rental_id);
    return rental;
  }

  async findByUser(user_id) {
    const rentalByUser = await this.ormRepository.find({
      where: {
        user_id
      },
      relations: ["car"]
    });
    return rentalByUser;
  }

}

exports.RentalsRepository = RentalsRepository;