const {fetchTopics, fetchEndpoints} = require('../models/topics.models')

exports.getTopics = (request, response) => {
    fetchTopics().then((topics) => {
        response.status(200).send({topics})
    })
}

exports.getEndpoints = (request, response) => {
    fetchEndpoints().then((data) => {
        response.status(200).send(data)
    })
}