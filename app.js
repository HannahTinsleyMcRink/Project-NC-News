const {
  getTopics,
  getEndpoints,
  getArticlesByID,
  getArticles,
  getArticleComments,
  postArticleComment,
  patchArticleVote,
  deleteComment,
} = require("./controllers/topics.controllers");
const express = require("express");
const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api", getEndpoints);
app.get("/api/articles/:article_id", getArticlesByID);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id/comments", getArticleComments);
app.post("/api/articles/:article_id/comments", postArticleComment);
app.patch("/api/articles/:article_id", patchArticleVote);
app.delete("/api/comments/:comment_id", deleteComment)

app.use((err, request, response, next) => {
  if (err.code === "22P02") {
    response.status(400).send({ message: "Bad Request" });
  } else if (err.code === "23503") {
    response.status(404).send({ message: "Not Found" });
  } else if (err.code === "23502") {
    response.status(400).send({ message: "Bad Request" });
  } else {
    next(err);
  }
});
app.use((err, request, response, next) => {
  if (err.message === "Not Found") {
    response.status(404).send({ message: err.message });
  } else {
    next(err);
  }
});
app.use((err, request, response, next) => {
  console.log(err);
  response.status(500).send({
    message: "Server Error",
  });
});

module.exports = app;
