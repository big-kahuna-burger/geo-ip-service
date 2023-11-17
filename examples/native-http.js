import createServer from '../src/utils/server.js'
const { PORT = 0 } = process.env

try {
  const listener = createServer()
  listener.listen(PORT)
  const { port } = listener.address()
  console.info(`Server is listening at http://localhost:${port}`)
  console.info(`test it http://localhost:${port}?ip=1.1.1.1`)
} catch (error) {
  console.error(error)
}
