const info = require('microservice-info')
const { apiGatewayUrl, bucketPath } = require('./configuration')

const _fileUrl = file => `${apiGatewayUrl}/${info.name}/_static${file.path.replace(bucketPath, "")}`

const sendReceivedFilesInfo = (req, res) =>
  res.json(req.files.map(_mapFile))

const sendHealthStatus = (req, res) =>
  res.json({ status: "healthy" })

const _mapFile = file => {
  file.insertedBy = info.host
  file.url = _fileUrl(file)

  return file
}

const _url = route => `/${info.name}${route}`

module.exports = {
  _url,
  _mapFile,
  sendHealthStatus,
  sendReceivedFilesInfo
}
