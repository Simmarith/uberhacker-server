const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())

app.get('/', (req,res) => {
  res.send('This is the backend server for uberhacker. Tell your client to navigate here.')
})

app.listen(8000, function () {
  console.log('Uberhacker Server listening on port 8000!');
});

module.exports = {
  app
}

