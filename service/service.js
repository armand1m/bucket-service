const express = require('express')
const path = require('path')
const multer  = require('multer')
const serveStatic = require('serve-static')
const serveIndex = require('serve-index')
const morgan = require('morgan')
const errorHandler = require('api-error-handler')

const {
  bucketPath,
  multerConfig,
  serveIndexConfig
} = require('./configuration')

const {
  _url,
  sendHealthStatus,
  sendReceivedFilesInfo
} = require('./functions')

const api = express()

const upload = multer(multerConfig)

api.use(errorHandler())

api.use(morgan('combined'))

api.use(_url('/_static'), serveStatic(bucketPath))

api.use(_url('/_static'), serveIndex(bucketPath, serveIndexConfig))

api.get(_url('/health'), sendHealthStatus)

api.post(_url('/'), upload.any(), sendReceivedFilesInfo)

module.exports = {
  start: async (port) => await api.listen(port),
  stop: async (instance) => await instance.close()
}
