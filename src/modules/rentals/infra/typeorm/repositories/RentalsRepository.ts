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
    id,
    end_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.ormRepository.create({
      car_id,
      user_id,
      expected_return_date,
      id,
      end_date,
      total,
    });

    await this.ormRepository.save(rental);

    return rental;
  }
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const openByCar = await this.ormRepository.findOne({
      where: { car_id, end_date: null },
    });

    return openByCar;
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUser = await this.ormRepository.findOne({
      where: { user_id, end_date: null },
    });

    return openByUser;
  }

  async findById(rental_id: string): Promise<Rental> {
    const rental = await this.ormRepository.findOne(rental_id);

    return rental;
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    const rentalByUser = await this.ormRepository.find({
      where: { user_id },
      relations: ["car"],
    });

    return rentalByUser;
  }
}

export { RentalsRepository };
