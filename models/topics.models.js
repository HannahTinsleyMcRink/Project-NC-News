const db = require('../db/connection')
const fs = require('fs/promises')

exports.fetchTopics = () => {
    return db
    .query("SELECT * FROM topics;")
    .then(({rows}) => {
        return rows
    })
    .catch((err) => {
        console.log(err)
    })
}

exports.fetchEndpoints = () => {
    return fs.readFile('./endpoints.json', 'utf8')
    .then((result) => {
        return JSON.parse(result)
    })
    .catch((err) => {
        console.log(err)
    })
}
