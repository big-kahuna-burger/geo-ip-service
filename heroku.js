const debug = require('debug')
const port = process.env.PORT || 3000
const server = require('./src/server')

server.listen(port, err => {
  if (err) {
    debug(err)
    process.exit(1)
  }
  console.log(`process listening on ${port}`)
})
