function noop() {}

function heartbeat() {
  this.isAlive = true
}

module.exports = {
  killDeadConnections (wss) {
    wss.on('connection', (ws) => {
      ws.isAlive = true
      ws.on('pong', heartbeat)
    })

    const interval = setInterval(() => {
      wss.clients.forEach((ws) => {
        if (ws.isAlive === false) return ws.terminate()

        ws.isAlive = false
        ws.ping(noop)
      })
    }, 30000)
  },
  sendToAll (wss, payload) {
    wss.clients.forEach((ws) => {
      ws.send(JSON.stringify(payload))
    })
  }
}

