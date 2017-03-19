const { consul } = require('microservice-info')

module.exports = require('consul')(consul.configuration)
