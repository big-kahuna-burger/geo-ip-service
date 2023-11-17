import Koa from 'koa'
import Router from 'koa-router'
import { getMiddleware } from '../index.js'

const app = new Koa()
const router = new Router()
const ipMiddleware = getMiddleware({ reqProperty: 'ipinfo' })

app.use(async (ctx, next) => {
  await ipMiddleware(ctx.req, ctx.res, next)
})

router.get('ipinfo', '/ipinfo', async (ctx, next) => {
  ctx.body = ctx.req?.ipinfo
  ctx.status = 200
  await next()
})

app.use(router.routes())

app.listen(3000)
console.log('Test it: http://localhost:3000/ipinfo?ip=1.1.1.1')
