const MicroserviceWrapper = require('microservice-wrapper')
const service = require('./service')

new MicroserviceWrapper(service).start()
