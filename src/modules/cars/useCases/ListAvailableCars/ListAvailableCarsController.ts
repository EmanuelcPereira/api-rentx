import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

class ListAvailableCarsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { brand, name, category_id } = req.query;

    const listAvailableCarUseCase = container.resolve(ListAvailableCarsUseCase);

    const cars = await listAvailableCarUseCase.execute({
      brand: brand as string,
      name: name as string,
      category_id: category_id as string,
    });
    console.log(cars);
    return res.json(cars);
  }
}

export { ListAvailableCarsController };
