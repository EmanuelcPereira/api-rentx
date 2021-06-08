import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { v4 as uuid } from "uuid";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];
  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    car.id = uuid();
    car.name = name;
    car.description = description;
    car.available = true;
    car.daily_rate = daily_rate;
    car.license_plate = license_plate;
    car.fine_amount = fine_amount;
    car.brand = brand;
    car.category_id = category_id;

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }
}

export { CarsRepositoryInMemory };
