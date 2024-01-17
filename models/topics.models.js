const db = require('../db/connection')
const fs = require('fs/promises')

exports.fetchTopics = () => {
    return db
    .query('SELECT * FROM topics')
    .then(({rows}) => {
        return rows
    })
}

exports.fetchEndpoints = () => {
    return fs.readFile('./endpoints.json', 'utf8')
    .then((result) => {
        return JSON.parse(result)
    })
}

exports.fetchArticlesByID = (article_id) => {
    return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then(({rows}) => {
        if(rows.length === 0) {
            return Promise.reject({status: 404, message: "Not Found"})
        }
        return rows[0]
    })
}

exports.fetchArticles = () => {
    return db
    .query(`SELECT author, title, article_id, topic, created_at, votes, article_img_url,CAST((SELECT COUNT(article_id) AS comment_count FROM comments WHERE comments.article_id = articles.article_id) AS INTEGER) FROM articles ORDER BY created_at DESC`)
    .then(({rows}) => {
        return rows
    })
}
