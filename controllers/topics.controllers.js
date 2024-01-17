const {fetchTopics, fetchEndpoints, fetchArticlesByID, fetchArticles} = require('../models/topics.models')

exports.getTopics = (request, response, next) => {
    fetchTopics().then((topics) => {
        response.status(200).send({topics})
    })
    .catch((err) => {
        next(err)
    })
}

exports.getEndpoints = (request, response, next) => {
    fetchEndpoints().then((endpoints) => {
        response.status(200).send(endpoints)
    })
    .catch((err) => {
        next(err)
    })
}

exports.getArticlesByID = (request, response, next) => {
    const { article_id } = request.params
    fetchArticlesByID(article_id).then((article) => {
        response.status(200).send({article})
    })
    .catch((err) => {
        next(err)
    })
}

exports.getArticles = (request, response, next) => {
    fetchArticles().then((articles) => {
        response.status(200).send({articles})
    })
    .catch((err) => {
        next(err)
    })
}

