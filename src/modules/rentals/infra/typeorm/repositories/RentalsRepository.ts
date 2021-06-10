import { IRentalRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { getRepository, Repository } from "typeorm";

import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalRepository {
  private ormRepository: Repository<Rental>;

  constructor() {
    this.ormRepository = getRepository(Rental);
  }
  async create(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    throw new Error("Method not implemented.");
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    throw new Error("Method not implemented.");
  }
}

export { RentalsRepository };
