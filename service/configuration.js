const multer = require('multer')
const path = require('path')
const yn = require('yn')
const fs = require('fs')
const mkdirp = require('mkdirp')

const {
  BUCKET_PATH:bucketPath
, API_GATEWAY_URL:apiGatewayUrl
, BUCKET_SHOW_ICONS:mustShowIcons
, BUCKET_SHOW_HIDDEN_FILES:mustShowHiddenFiles
} = process.env

const serveIndexConfig = {
  icons: yn(mustShowIcons)
, hidden: yn(mustShowHiddenFiles)
}

const multerStorage = {
  destination: function (req, file, cb) {
    let dir = path.resolve(bucketPath, file.fieldname, `${Date.now()}`)

    if (!fs.existsSync(dir)) {
      mkdirp.sync(dir)
    }

    cb(null, dir)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
}

const multerConfig = {
  dest: bucketPath,
  storage: multer.diskStorage(multerStorage)
}

module.exports = {
  bucketPath,
  apiGatewayUrl,
  mustShowIcons,
  mustShowHiddenFiles,
  multerConfig,
  serveIndexConfig
}
