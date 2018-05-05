const path = require('path')
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const routes = require('./routes.json')
const middlewares = jsonServer.defaults({ static: './build' })

const catchAll = function(req, res) {
  res.sendFile(path.join(__dirname, './build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
}

const clientRoutes = [
  '/konami-code',
  '/basic',
  '/ping-pong',
  '/interval-reducers'
]

server.use(middlewares)
server.use(jsonServer.rewriter(routes))
server.get(clientRoutes, catchAll)
server.use(router)
server.listen(3030, () => {
  console.log('JSON Server is running')
})
