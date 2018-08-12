const app = require('./../index.js').app

/** USER SPEC
 *  id {string} nickname of the user. MUST BE UNIQUE!
 *  points {number} current points of this user
 */

const USER_START_POINTS = 0

class UserHandler {
  constructor () {
    this.users = []
  }

  init (app) {
    app.post('/user/add', (req, res) => {
      console.log(req.body)
      if (req.body.id) {
        this.addUser(req.body.id)
        res.send()
      } else {
        res.status(400).send('Bad Request')
      }
    })

    app.get('/user', (req, res) => {
      if (req.body.id) {
        const user = UserHandler.getUserById(req.body.id)
        if (user) {
          res.setHeader('Content-Type', 'application/json')
          res.send(JSON.stringify({ user }))
        } else {
          res.status(404).send('User not found')
        }
      } else {
        res.status(404).send('Bad Request')
     }
    })

    app.get('/users', (req, res) => {
      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify({ users: this.users }))
    })
  }

  addUser (id) {
    if (!this.getUserById(id)) {
      this.users.push({ id, points: USER_START_POINTS })
    }
  }

  getUserById (id) {
    return this.users.find((user) => {
      return user.id === id
    })
  }
}

module.exports = new UserHandler()
