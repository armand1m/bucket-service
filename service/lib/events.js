const onServiceRegistered = () => {
  console.log("Server registered for Service Discovery.")
}

const onServiceUnregistered = () => {
  console.log("Server unregistered from Service Discovery.")
}

const onServerRunning = (uri) => {
  console.log(`Server running at: ${uri}`)
}

const doSafeExit = () => {
  console.log("Service was gracefully terminated.")
  return process.exit(0)
}

const doErrorExit = (err) => {
  console.error(err)
  return process.exit(1)
}

const onServiceRegisterError = (err) => {
  console.error("Can't register for Service Discovery.")
}

const onServiceUnregisterError = (err) => {
  console.error("Can't unregister from Service Discovery.")
}

module.exports = {
  doErrorExit,
  doSafeExit,
  onServerRunning,
  onServiceRegistered,
  onServiceUnregistered,
  onServiceRegisterError,
  onServiceUnregisterError
}