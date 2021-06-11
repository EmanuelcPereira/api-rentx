import { ICreateRentalDTO } from "@modules/rentals/dto/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { v4 as uuid } from "uuid";

import { IRentalRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalRepository {
  rentals: Rental[] = [];

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      id: uuid(),
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );
  }

  async findById(rental_id: string): Promise<Rental> {
    return this.rentals.find((rental) => rental.id === rental_id);
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    const rentals = this.rentals.filter((rental) => rental.user_id === user_id);

    return rentals;
  }
}

export { RentalsRepositoryInMemory };
