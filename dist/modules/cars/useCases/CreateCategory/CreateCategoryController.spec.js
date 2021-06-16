"use strict";

var _bcrypt = require("bcrypt");

var _supertest = _interopRequireDefault(require("supertest"));

var _uuid = require("uuid");

var _app = require("@shared/infra/http/app");

var _typeorm = _interopRequireDefault(require("@shared/infra/typeorm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let connection;
describe("create Category controller", () => {
  beforeAll(async () => {
    connection = await (0, _typeorm.default)();
    await connection.runMigrations();
    const id = (0, _uuid.v4)();
    const password = await (0, _bcrypt.hash)("admin", 10);
    await connection.query(`INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'cccaaabbb')
      `);
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it("should be able to create a new category", async () => {
    const responseToken = await (0, _supertest.default)(_app.app).post("/sessions").send({
      email: "admin@rentx.com",
      password: "admin"
    });
    const {
      refresh_token
    } = responseToken.body;
    const response = await (0, _supertest.default)(_app.app).post("/categories").send({
      name: "Category Supertest",
      description: "Category supertest"
    }).set({
      Authorization: `Bearer ${refresh_token}`
    });
    expect(response.status).toBe(201);
  });
  it("should not be able to create a new category with existent name", async () => {
    const responseToken = await (0, _supertest.default)(_app.app).post("/sessions").send({
      email: "admin@rentx.com",
      password: "admin"
    });
    const {
      refresh_token
    } = responseToken.body;
    const response = await (0, _supertest.default)(_app.app).post("/categories").send({
      name: "Category Supertest",
      description: "Category supertest"
    }).set({
      Authorization: `Bearer ${refresh_token}`
    });
    expect(response.status).toBe(400);
  });
});