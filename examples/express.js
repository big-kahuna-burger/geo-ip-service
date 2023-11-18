import express from 'express'
import { getMiddleware } from '../index.js'

const app = express()
const ipMiddleware = getMiddleware({ reqProperty: 'ipinfo' })

app.use(ipMiddleware)

app.use((req, res) => {
  res.setHeader('Vercel-CDN-Cache-Control', 'max-age=3600');
  res.setHeader('CDN-Cache-Control', 'max-age=60');
  res.setHeader('Cache-Control', 'max-age=10');
  res.json(req.ipinfo)
})

app.listen(0)
