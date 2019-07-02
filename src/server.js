const http = require('http')
const ipMiddleware = require('./middleware-factory')()

const server = http.createServer((req, res) => {
  ipMiddleware(req, res, err => {
    if (err) {
      console.log(err)
      res.statusCode(500)
      return res.end('Internal Server Error')
    }
    // mount any other middleware, req.cityInfo will be available here
    res.setHeader('Content-Type', 'application/json;charset=UTF-8')
    res.end(JSON.stringify(req.cityInfo))
  })
})

module.exports = server
