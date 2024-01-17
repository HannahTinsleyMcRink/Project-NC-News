const {getTopics, getEndpoints, getArticlesByID, getArticles} = require("./controllers/topics.controllers")
const express = require("express")
const app = express()

app.get('/api/topics', getTopics)
app.get('/api', getEndpoints)
app.get('/api/articles/:article_id', getArticlesByID)
app.get('/api/articles', getArticles)

app.use((err, request, response, next) => {
    if (err.code === '22P02') {
        response.status(400).send({message: "Bad Request"})
    } else {
        next(err)
    }
})
app.use((err, request, response, next) => {
    if (err.message === "Not Found") {
        response.status(404).send({message: err.message})
    } else {
        next(err)
    }
})
app.use((err, request, response, next) => {
    console.log(err)
    response.status(500).send({
        message: "Server Error"
    })
})

module.exports = app