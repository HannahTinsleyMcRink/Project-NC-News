const db = require("../db/connection");
const fs = require("fs/promises");
const format = require("pg-format");

exports.fetchTopics = () => {
  return db.query("SELECT * FROM topics").then(({ rows }) => {
    return rows;
  });
};
exports.fetchEndpoints = () => {
  return fs.readFile("./endpoints.json", "utf8").then((result) => {
    return JSON.parse(result);
  });
};
exports.fetchArticlesByID = (article_id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, message: "Not Found" });
      }
      return rows[0];
    });
};
// exports.fetchArticles = () => {
//     return db
//       .query(
//         `SELECT author, title, article_id, topic, created_at, votes, article_img_url,CAST((SELECT COUNT(article_id) AS comment_count FROM comments WHERE comments.article_id = articles.article_id) AS INTEGER) FROM articles ORDER BY created_at DESC`
//       )
//       .then(({ rows }) => {
//         return rows;
//       });
//   };
exports.fetchArticles = (query) => {
    const topic = query.topic
    const validTopics = ["mitch", "cats", "paper", undefined]
    if (Object.keys(query).length !== 0) {
        if (!Object.keys(query).includes("topic")) {
            Promise.reject({ status: 404, message: "To be sorted (query invalid)" })
        }
    }
    if (!validTopics.includes(topic)) {
        Promise.reject({ status: 404, message: "To be sorted (topic invalid)" })
    }
    let queryString = `SELECT
    author,
    title,
    article_id,
    topic,
    created_at,
    votes,
    article_img_url,
    CAST
    ((SELECT COUNT(*)
    FROM comments
    WHERE articles.article_id=comments.article_id) AS INTEGER)
    AS comment_count
    FROM articles `;

    if (!topic) {
        queryString += `ORDER BY created_at DESC`
    } else {
        queryString += format(`WHERE topic = %L ORDER BY created_at DESC`, topic)
    }

  return db
    .query(queryString)
    .then(({ rows }) => {
        console.log(rows, "<-- rows in models")
      return rows;
    });
};
exports.fetchArticleTopic = (articleTopic) => {
    return db
      .query(
        `SELECT * FROM articles WHERE topic = $1`,
        [articleTopic]
      )
      .then(({ rows }) => {
        if (rows.length === 0) {
          return Promise.reject({ status: 404, message: "Not Found" });
        }
        console.log(rows, "<-- rows in models")
        return rows;
      });
  };
//
exports.fetchArticleComments = (article_id) => {
  return db
    .query(
      `SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`,
      [article_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, message: "Not Found" });
      }
      return rows;
    });
};
exports.addComment = (newComment, article_id) => {
  const { username, body } = newComment;
  const databaseQuery = format(
    `INSERT INTO comments (author, body, article_id) VALUES %L RETURNING *`,
    [[username, body, article_id]]
  );
  return db.query(databaseQuery).then(({ rows }) => {
    return rows[0];
  });
};
exports.addVote = (updateVote, article_id) => {
  const { inc_votes } = updateVote;
  return db
    .query(
      `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *`,
      [inc_votes, article_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, message: "Not Found" });
      }
      return rows[0];
    });
};
exports.removeComment = (comment_id) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *`, [
      comment_id,
    ])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, message: "Not Found" });
      }
      return rows[0];
    });
};
exports.fetchUsers = () => {
  return db.query("SELECT * FROM users").then(({ rows }) => {
    return rows;
  });
};
