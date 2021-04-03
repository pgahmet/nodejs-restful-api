process.env.NODE_ENV = "test";
process.env.PORT = "8082";
process.env.MONGODB_URL = "mongodb://127.0.0.1:27017/test";

const server = require("../lib/server");
const mongoose = require("mongoose");
const supertest = require("supertest");

beforeEach((done) => {
  mongoose.connect(
    process.env.MONGODB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done()
  );
});

afterEach(async (done) => {
  mongoose.connection.close(() => done());
});

describe("get method tests", () => {
  test("not allow GET /", async () => {
    const response = await supertest(server).get("/");
    expect(response.status).toEqual(400);
  });
});

describe("not found tests", () => {
  test("not found POST /someurl", async () => {
    const response = await supertest(server).post("/someurl");
    expect(response.status).toEqual(404);
  });
});

describe("working filter tests", () => {
  test("POST /api/filter", async () => {
    const requestData = {
      startDate: "2016-01-26",
      endDate: "2018-02-02",
      minCount: 2900,
      maxCount: 3000,
    };

    await supertest(server)
      .post("/api/filter")
      .send(requestData)
      .then((response) => {
        const records = response.body.records;
        // Check type and length
        expect(Array.isArray(records)).toBeTruthy();
        // Check data
        expect(response.body.code).toEqual(0);
        expect(response.body.msg).toBe("Success");
        expect(response.statusCode).toBe(200);
      });
  });
});

describe("not found any record tests", () => {
  test("POST /api/filter", async () => {
    const requestData = {
      startDate: "2020-01-26",
      endDate: "2021-02-02",
      minCount: 2900,
      maxCount: 3000,
    };

    await supertest(server)
      .post("/api/filter")
      .send(requestData)
      .then((response) => {
        // Check data
        expect(response.body.code).toEqual(404);
        expect(response.body.msg).toBe("Record not found!");
        expect(response.statusCode).toBe(404);
      });
  });
});

describe("validation filter tests", () => {
  test("POST /api/filter", async () => {
    const requestData = {
      endDate: "2018-02-02",
      minCount: 2900,
      maxCount: 3000,
    };

    await supertest(server)
      .post("/api/filter")
      .send(requestData)
      .then((response) => {
        expect(response.body.code).toEqual(422);
        expect(response.statusCode).toBe(422);
      });
  });
});
