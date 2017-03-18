const Info = require('./info')
const Events = require('./events')
const Service = require('./service')
const ConsulAgentService = require('./consul').agent.service

const kill = err => {
  Events.doErrorExit(err)
  Events.onServiceRegisterError(e)
}

class Server {
  start() {
    let { uri, path, port } = Info

    Service.listen(port, (err) => {
      if (err) {
        Events.doErrorExit(err)
        return
      }

      console.log(`Example app listening on port ${port}!`)

      Events.onServerRunning(uri)

      this.register()
        .then(Events.onServiceRegistered)
        .then(this.setTerminationHandlers.bind(this))
        .catch(kill)
    })
  }

  terminate() {
    this.deregister()
      .then(Events.onServiceUnregistered)
      .then(Events.doSafeExit)
      .catch(kill)
  }

  register() {
    return ConsulAgentService.register(Info.consul.description)
  }

  deregister() {
    return ConsulAgentService.deregister(Info.consul.description.name)
  }

  setTerminationHandlers() {
    ['SIGINT', 'SIGTERM', 'SIGUSR2', 'SIGHUP'].forEach(signal => process.on(signal, this.terminate))
  }
}

module.exports = Server
