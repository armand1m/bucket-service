const express = require('express')
const path = require('path')
const multer  = require('multer')
const serveStatic = require('serve-static')
const serveIndex = require('serve-index')
const morgan = require('morgan')
const errorHandler = require('api-error-handler')
const info = require('microservice-info')

const { BUCKET_PATH } = process.env

const _mapFile = file => {
  file.insertedBy = info.host
  file.url = `${info.uri}/${info.name}/${file.filename}`

  return file
}

const _url = route => `/${info.name}${route}`

const api = express()
const upload = multer({ dest: BUCKET_PATH })

api.use(errorHandler())

api.use(morgan('combined'))

api.use(_url('/_static'), serveStatic(BUCKET_PATH))

api.use(_url('/_static'), serveIndex(BUCKET_PATH, { icons: true }))

api.post(_url('/'), upload.any(), (req, res) => res.json(req.files.map(_mapFile)))

api.get(_url('/health'), (req, res) => res.json({ status: "healthy" }))

module.exports = {
  start: async (port) => await api.listen(port),
  stop: async (instance) => await instance.close()
}
