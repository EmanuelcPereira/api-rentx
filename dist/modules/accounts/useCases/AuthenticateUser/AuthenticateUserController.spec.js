"use strict";

var _bcrypt = require("bcrypt");

var _supertest = _interopRequireDefault(require("supertest"));

var _uuid = require("uuid");

var _app = require("../../../../shared/infra/http/app");

var _typeorm = _interopRequireDefault(require("../../../../shared/infra/typeorm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let connection;
describe("Authenticate user controller", () => {
  beforeAll(async () => {
    connection = await (0, _typeorm.default)();
    await connection.runMigrations();
    const id = (0, _uuid.v4)();
    const password = await (0, _bcrypt.hash)("admin", 8);
    await connection.query(`INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license) 
        values('${id}' , 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')
        `);
  });
  it("should be able authenticate user", async () => {
    const response = await (0, _supertest.default)(_app.app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin"
    });
    expect(response.status).toBe(200);
  });
  afterEach(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
});