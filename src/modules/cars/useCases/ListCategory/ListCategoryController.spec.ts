import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuid } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;
describe("List Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuid();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license) 
        values('${id}' , 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')
        `
    );
  });

  it("should be able to list all categories", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { refresh_token } = responseToken.body;

    await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category Description Supertest",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    const res = await request(app).get("/categories");

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0]).toHaveProperty("id");
  });

  afterEach(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
});
