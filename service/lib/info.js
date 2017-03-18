const os = require('os')
const ip = require('ip')
const toTaggedPrefix = prefix => `urlprefix-${prefix}`

const SPLITTED_PREFIXES = process.env.PREFIXES.split(",")

class Info {
  static get host() {
    return ip.address()
  }

  static get name() {
    return process.env.SERVICE_NAME
  }

  static get port() {
    return +process.env.SERVICE_PORT
  }

  static get prefixes() {
    return SPLITTED_PREFIXES
  }

  static get tags() {
    return SPLITTED_PREFIXES.map(toTaggedPrefix)
  }

  static get uri() {
    return `http://${Info.host}:${Info.port}`
  }

  static get check() {
    return {
      http: `${Info.uri}/${Info.name}/health`,
      interval: '10s'
    }
  }

  static get path() {
    return process.env.BUCKET_PATH
  }

  static get consul() {
    return {
      configuration: {
        host: process.env.CONSUL_HOST,
        port: process.env.CONSUL_PORT,
        promisify: true
      },
      description: {
        name: `${Info.name}:${Info.host}`,
        address: Info.host,
        port: Info.port,
        tags: Info.tags,
        check: Info.check
      }
    }
  }
}

module.exports = Info
