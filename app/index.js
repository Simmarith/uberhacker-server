const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.use(cors())

const UserHandler = require('./entity-handler/UserHandler')

app.get('/', (req,res) => {
  res.send('This is the backend server for uberhacker. Tell your client to navigate here.')
})

UserHandler.init(app)

app.listen(8000, function () {
  console.log('Uberhacker Server listening on port 8000!');
});
