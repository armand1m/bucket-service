const Busboy = require('busboy')
const express = require('express')
const path = require('path')
const app = express()

const Info = require('microservice-info')

const BUCKET_PATH = process.env.BUCKET_PATH

app.get(`/${Info.name}/health`, (req, res) => {
  res.send('{ "status": "health" }')
})

app.use(`/${Info.name}/raw`, express.static(BUCKET_PATH))

app.post(`/${Info.name}/:path`, (req, res) => {
  let { headers } = req

  let busboy = new Busboy({ headers })

  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    let saveTo = path.join(BUCKET_PATH, path.basename(fieldname))

    console.log(`Saving ${filename} into ${saveTo}.`)

    file.pipe(fs.createWriteStream(saveTo))
  })

  busboy.on('finish', function() {
    console.log(`Saved ${filename} into ${saveTo}.`)
    res.append('Connection', 'close')
    res.status(200).end()
  })
})

module.exports = {
  start: async (port) => await app.listen(port),
  stop: async (instance) => await instance.close()
}
