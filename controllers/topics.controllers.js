const {fetchTopics, fetchEndpoints, fetchArticlesByID, fetchArticles, fetchArticleComments, addComment} = require('../models/topics.models')

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

exports.getArticleComments = (request, response, next) => {
    const { article_id } = request.params
    fetchArticleComments(article_id).then((comments) => {
        response.status(200).send({comments})
    })
    .catch((err) => {
        next(err)
    })
}

exports.postArticleComment = (request, response, next) => {
    addComment(request.body, request.params.article_id).then((comment) => {
        response.status(201).send({comment})
    })
    .catch((err) => {
        next(err)
    })
}