const { consul } = require('./info')

module.exports = require('consul')(consul.configuration)