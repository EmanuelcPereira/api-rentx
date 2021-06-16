"use strict";

var _CategoriesRepositoryInMemory = require("../../repositories/in-Memory/CategoriesRepositoryInMemory");

var _AppError = require("../../../../shared/errors/AppError");

var _CreateCategoryUseCase = require("./CreateCategoryUseCase");

let createCategoryUseCase;
let categoriesRepositoryInMemory;
describe("Create category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new _CategoriesRepositoryInMemory.CategoriesRepositoryInMemory();
    createCategoryUseCase = new _CreateCategoryUseCase.CreateCategoryUseCase(categoriesRepositoryInMemory);
  });
  it("should be able to create a new category", async () => {
    const category = {
      name: "Category test",
      description: "Category description teste"
    };
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    });
    const createdCategory = await categoriesRepositoryInMemory.findByName(category.name);
    expect(createdCategory).toHaveProperty("id");
  });
  it("should not be able to create a existent category", async () => {
    const category = {
      name: "Category test",
      description: "Category description teste"
    };
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    });
    await expect(createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    })).rejects.toBeInstanceOf(_AppError.AppError);
  });
});