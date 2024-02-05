const {
  fetchTopics,
  fetchEndpoints,
  fetchArticlesByID,
  fetchArticles,
  fetchArticleComments,
  addComment,
  addVote,
  removeComment,
  fetchUsers,
  fetchArticleTopic,
} = require("../models/topics.models");

exports.getTopics = (request, response, next) => {
  fetchTopics()
    .then((topics) => {
      response.status(200).send({ topics });
    })
    .catch((err) => {
      next(err);
    });
};
exports.getEndpoints = (request, response, next) => {
  fetchEndpoints()
    .then((endpoints) => {
      response.status(200).send(endpoints);
    })
    .catch((err) => {
      next(err);
    });
};
exports.getArticlesByID = (request, response, next) => {
  const { article_id } = request.params;
  fetchArticlesByID(article_id)
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};
// exports.getArticles = (request, response, next) => {
//   fetchArticles()
//     .then((articles) => {
//       response.status(200).send({ articles });
//     })
//     .catch((err) => {
//       next(err);
//     });
// };
exports.getArticles = (request, response, next) => {
  const query = request.query
  console.log(query)
  fetchArticles(query)
  // if (request.query.articleTopic) {
  //   const articleTopic = request.query.topic;
  //   //console.log(articleTopic, "<--topic in controller");
  //   fetchArticles(articleTopic).then((articles) => {
  //     //console.log(articles, "<--articles in controller");
  //     response.status(200).send({ articles });
  //   });
  // } else {
  //   fetchArticles()
      .then((articles) => {
        response.status(200).send({ articles });
      })
      .catch((err) => {
        //console.log(err, "<-- err in controller");
        next(err);
      });
  }
//};

exports.getArticleComments = (request, response, next) => {
  const { article_id } = request.params;
  fetchArticleComments(article_id)
    .then((comments) => {
      response.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};
exports.postArticleComment = (request, response, next) => {
  addComment(request.body, request.params.article_id)
    .then((comment) => {
      response.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};
exports.patchArticleVote = (request, response, next) => {
  addVote(request.body, request.params.article_id)
    .then((updatedVote) => {
      response.status(200).send({ updatedVote });
    })
    .catch((err) => {
      next(err);
    });
};
exports.deleteComment = (request, response, next) => {
  const commentID = request.params.comment_id;
  removeComment(commentID)
    .then(() => {
      response.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};
exports.getUsers = (request, response, next) => {
  fetchUsers()
    .then((users) => {
      response.status(200).send({ users });
    })
    .catch((err) => {
      next(err);
    });
};
