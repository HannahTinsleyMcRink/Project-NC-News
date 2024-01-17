const db = require("../db/connection");
const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const original = require("../endpoints.json");

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
        .then(({ body }) => {
          expect(typeof body).toBe("object");
          expect(Object.keys(body).length).toBeGreaterThan(0);
          expect(JSON.stringify(body)).toEqual(JSON.stringify(original));
        });
    });
  });
});

describe("/api/articles/:article_id", () => {
  describe("GET", () => {
    test("status: 200 responds with an object containing an article object with correct properties when selcted for by article_id", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          const { article } = body;
          expect(typeof body).toBe("object");
          expect(article).toEqual({
            author: "butter_bridge",
            title: "Living in the shadow of a great man",
            article_id: 1,
            body: "I find this existence challenging",
            topic: "mitch",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 100,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          });
        });
    });
    test("status: 404 responds with appropriate message when given valid but non existent article_id", () => {
      return request(app)
        .get("/api/articles/10000")
        .expect(404)
        .then(({ body: { message } }) => {
          expect(message).toBe("Not Found");
        });
    });
    test("status: 400 responds with appropriate message when given invalid article_id", () => {
      return request(app)
        .get("/api/articles/nonsense")
        .expect(400)
        .then((response) => {
          const message = response.body.message;
          expect(message).toBe("Bad Request");
        });
    });
  });
});

describe("/api/articles", () => {
  describe("GET", () => {
    test("status: 200 responds with array of articles objects with correct properties", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(Array.isArray(articles)).toBe(true);
          expect(articles.length).toBeGreaterThan(0);
          articles.forEach((article) => {
            expect(typeof article.author).toBe("string");
            expect(typeof article.title).toBe("string");
            expect(typeof article.article_id).toBe("number");
            expect(typeof article.topic).toBe("string");
            expect(typeof article.created_at).toBe("string");
            expect(typeof article.votes).toBe("number");
            expect(typeof article.article_img_url).toBe("string");
            expect(typeof article.comment_count).toBe("number");
            expect(typeof article.body).toBe("undefined");
          });
        });
    });
    test("status: 200 by default sort criteria by date in descending order", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(articles).toBeSortedBy("created_at", { descending: true });
        });
    });
  });
});

describe("/api/articles/:article_id/comments", () => {
  describe("GET", () => {
    test("status: 200 responds with array of comments with correct properties", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body }) => {
          const { comments } = body;
          expect(Array.isArray(comments)).toBe(true);
          expect(comments.length).toBeGreaterThan(0);
          comments.forEach((comment) => {
            expect(typeof comment.comment_id).toBe("number");
            expect(typeof comment.votes).toBe("number");
            expect(typeof comment.created_at).toBe("string");
            expect(typeof comment.author).toBe("string");
            expect(typeof comment.body).toBe("string");
            expect(typeof comment.article_id).toBe("number");
          });
        });
    });
    test("status: 200 by default sort criteria by date in descending order", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body }) => {
          const { comments } = body;
          expect(comments).toBeSortedBy("created_at", { descending: true });
        });
    });
    test("status: 404 responds with appropriate message when given valid but non existent article_id", () => {
      return request(app)
        .get("/api/articles/10000/comments")
        .expect(404)
        .then(({ body: { message } }) => {
          expect(message).toBe("Not Found");
        });
    });
    test("status: 400 responds with appropriate message when given invalid article_id", () => {
      return request(app)
        .get("/api/articles/nonsense/comments")
        .expect(400)
        .then((response) => {
          const message = response.body.message;
          expect(message).toBe("Bad Request");
        });
    });
  });
});
