const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const WebSocket = require('ws')
const wsUtils = require('./utils/WebSocket')
const app = express()
app.use(bodyParser.json())
app.use(cors())
const wss = new WebSocket.Server({
  port: 8001
}, (e) => {
  console.log('WebSocket Server listening on 8001!')
})
wsUtils.killDeadConnections(wss)

const UserHandler = require('./entity-handler/UserHandler')

app.get('/', (req,res) => {
  res.send('This is the backend server for uberhacker. Tell your client to navigate here.')
})

UserHandler.init(app, wss)

app.listen(8000, function () {
  console.log('Uberhacker Server listening on port 8000!')
})

