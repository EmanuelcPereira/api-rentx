import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-Memory/CarsRepositoryInMemory";

import { CreateCarUseCase } from "../CreateCar/CreateCarUseCase";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepository: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("List cars", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
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

    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    await createCarUseCase.execute({
      name: "fusca",
      description: "carro antigo",
      daily_rate: 2,
      license_plate: "abc-123",
      fine_amount: 1,
      brand: "volkswagen",
      category_id: "rsrsrsrsrs",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "volkswagen",
    });
    expect(cars[0].brand).toEqual("volkswagen");
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

    const cars = await listAvailableCarsUseCase.execute({ name: "fusca" });
    expect(cars[0].name).toEqual("fusca");
  });

  it("should be able to list all available cars by category", async () => {
    await createCarUseCase.execute({
      name: "fusca",
      description: "carro antigo",
      daily_rate: 2,
      license_plate: "abc-123",
      fine_amount: 1,
      brand: "volkswagen",
      category_id: "rsrsrsrsrs",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "rsrsrsrsrs",
    });
    expect(cars[0].category_id).toEqual("rsrsrsrsrs");
  });
});
