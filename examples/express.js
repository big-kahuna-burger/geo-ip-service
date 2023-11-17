import express from 'express'
import { getMiddleware } from '../index.js'

const app = express()
const ipMiddleware = getMiddleware({ reqProperty: 'ipinfo' })

app.use(ipMiddleware)

app.get('/ipinfo', (req, res) => {
  res.json(req.ipinfo)
})

app.listen(3000)
console.log('Test it: http://localhost:3000/ipinfo?ip=1.1.1.1')
