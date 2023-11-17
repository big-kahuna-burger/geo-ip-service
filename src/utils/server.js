import http from 'http'
import getMiddleware from '../get-middleware.js'

const createServer = () => {
  const middleware = getMiddleware()
  const handler = async (req, res) => middleware(req, res, err => {
    if (err) {
      res.statusCode(500)
      return res.end('Internal Server Error')
    }
    // mount any other middleware, req.cityInfo will be available here
    res.setHeader('Content-Type', 'application/json;charset=UTF-8')
    res.end(JSON.stringify(req.cityInfo))
  })
  return http.createServer(handler)
}

export default createServer
