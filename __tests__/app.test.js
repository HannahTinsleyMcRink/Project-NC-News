const db = require("../db/connection");
const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const original = require('../endpoints.json')

afterAll(() => {
  return db.end();
});
beforeEach(() => {
  return seed(data);
});

describe("/api/topics", () => {
  describe("GET", () => {
    test("status: 200 responds with array of topics objects with correct properties", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          const { topics } = body;
          expect(Array.isArray(topics)).toBe(true);
          expect(topics.length).toBeGreaterThan(0);
          topics.forEach((topic) => {
            expect(typeof topic.description).toBe("string");
            expect(typeof topic.slug).toBe("string");
          });
        });
    });
  });
});
describe("/api", () => {
  describe("GET", () => {
    test("status: 200 responds with an object describing all available endpoints", () => {
      return request(app)
      .get("/api")
      .expect(200)
      .then(({body}) => {
        expect(typeof body).toBe("object")
        expect(Object.keys(body).length).toBeGreaterThan(0)
        expect(JSON.stringify(body)).toEqual(JSON.stringify(original))
      });
    });
  });
});

