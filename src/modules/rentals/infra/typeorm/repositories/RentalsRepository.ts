import { ICreateRentalDTO } from "@modules/rentals/dto/ICreateRentalDTO";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { getRepository, Repository } from "typeorm";

import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalRepository {
  private ormRepository: Repository<Rental>;

  constructor() {
    this.ormRepository = getRepository(Rental);
  }
  async create({
    car_id,
    expected_return_date,
    user_id,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.ormRepository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    await this.ormRepository.save(rental);

    return rental;
  }
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const openByCar = await this.ormRepository.findOne({ car_id });

    return openByCar;
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUser = await this.ormRepository.findOne({ user_id });

    return openByUser;
  }
}

export { RentalsRepository };
