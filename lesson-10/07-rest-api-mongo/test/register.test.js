require("dotenv").config();

const supertest = require("supertest");
const { app } = require("../app");
const mongoose = require("mongoose");
const { response } = require("express");
const { User } = require("../models/user");

mongoose.set("strictQuery", false);
const { HOST_TEST_URI, PORT } = process.env;

describe("register", () => {
  beforeAll(async () => {
    await mongoose.connect(HOST_TEST_URI);
    await User.deleteMany();
  });

  afterAll(async () => {
    await mongoose.disconnect(HOST_TEST_URI);
  });

  it("schold register new user", async () => {
    const response = await supertest(app)
      .post("/api/auth/register")
      .send({ email: "test1@test.com", password: "movie2" });

    expect(response.statusCode).toBe(201);
    expect(response.body.data.user.email).toBe("test1@test.com");
  });
  it("schold register new user", async () => {
    const response = await supertest(app)
      .post("/api/auth/register")
      .send({ email: "test2@test.com", password: "movie2" });

    expect(response.statusCode).toBe(201);
    expect(response.body.data.user.email).toBe("test2@test.com");
  });
  it("schold not register the same 2 times", async () => {
    const response = await supertest(app)
      .post("/api/auth/register")
      .send({ email: "test1@test.com", password: "movie2" });

    expect(response.statusCode).toBe(409);
  });
});
