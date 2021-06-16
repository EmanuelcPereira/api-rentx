"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RentalsRepositoryInMemory = void 0;

var _Rental = require("@modules/rentals/infra/typeorm/entities/Rental");

var _uuid = require("uuid");

class RentalsRepositoryInMemory {
  constructor() {
    this.rentals = [];
  }

  async create({
    car_id,
    user_id,
    expected_return_date
  }) {
    const rental = new _Rental.Rental();
    Object.assign(rental, {
      id: (0, _uuid.v4)(),
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date()
    });
    this.rentals.push(rental);
    return rental;
  }

  async findOpenRentalByCar(car_id) {
    return this.rentals.find(rental => rental.car_id === car_id && !rental.end_date);
  }

  async findOpenRentalByUser(user_id) {
    return this.rentals.find(rental => rental.user_id === user_id && !rental.end_date);
  }

  async findById(rental_id) {
    return this.rentals.find(rental => rental.id === rental_id);
  }

  async findByUser(user_id) {
    const rentals = this.rentals.filter(rental => rental.user_id === user_id);
    return rentals;
  }

}

exports.RentalsRepositoryInMemory = RentalsRepositoryInMemory;