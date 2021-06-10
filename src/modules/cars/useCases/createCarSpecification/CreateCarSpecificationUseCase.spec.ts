import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-Memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-Memory/SpecificationsRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create a car especification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it("should be able to create a especification to an existent car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "kombi",
      description: "perua antiga",
      daily_rate: 2,
      license_plate: "abc-321",
      fine_amount: 1,
      brand: "volkswagen",
      category_id: "furgão",
    });

    const specifications_id = ["54345"];

    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });
  });

  it("should be able to create a especification to an non-existent existent car", async () => {
    expect(async () => {
      const car = await carsRepositoryInMemory.create({
        name: "fusca",
        description: "carro antigo",
        daily_rate: 2,
        license_plate: "abc-123",
        fine_amount: 1,
        brand: "volkswagen",
        category_id: "rsrsrsrsrs",
      });
      const specifications_id = ["54321"];

      await createCarSpecificationUseCase.execute({
        car_id: car.id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to ad a new especification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "kombi",
      description: "perua antiga",
      daily_rate: 2,
      license_plate: "abc-321",
      fine_amount: 1,
      brand: "volkswagen",
      category_id: "furgão",
    });

    const specification = await specificationsRepositoryInMemory.create({
      description: "test",
      name: "test",
    });

    const specifications_id = [specification.id];

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(1);
  });
});
