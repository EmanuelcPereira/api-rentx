import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarUseCase } from "./CreateCarUseCase";

class CreateCarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      name,
      description,
      brand,
      daily_rate,
      fine_amount,
      category_id,
      license_plate,
    } = req.body;

    const createCarUseCase = container.resolve(CreateCarUseCase);

    const car = await createCarUseCase.execute({
      name,
      description,
      brand,
      daily_rate,
      fine_amount,
      category_id,
      license_plate,
    });

    return res.status(201).json(car);
  }
}

export { CreateCarController };
