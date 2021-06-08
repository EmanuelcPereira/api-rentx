import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-Memory/CarsRepositoryInMemory";

import { CreateCarUseCase } from "../CreateCar/CreateCarUseCase";
import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepository: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("List cars", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepository);
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("should be able to list all available cars", async () => {
    const car = await createCarUseCase.execute({
      name: "fusca",
      description: "carro antigo",
      daily_rate: 2,
      license_plate: "abc-123",
      fine_amount: 1,
      brand: "volkswagen",
      category_id: "rsrsrsrsrs",
    });

    const cars = await listCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    await createCarUseCase.execute({
      name: "fusca",
      description: "carro antigo",
      daily_rate: 2,
      license_plate: "abc-123",
      fine_amount: 1,
      brand: "volkswagen",
      category_id: "rsrsrsrsrs",
    });

    const cars = await listCarsUseCase.execute({ brand: "volkswagen" });
    expect(cars[0].available).toEqual(true);
  });
});
