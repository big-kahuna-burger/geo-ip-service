const { fixtureTgzFile } = require('../src/constants')
const {
  zlibTransform,
  tarfsWritable,
  download
} = require('../src/download-utils')
const rs = require('fs').createReadStream(fixtureTgzFile)

if (!process.env.MAXMIND_LICENSE_KEY) {
  console.warn(
    'no MAXMIND_LICENSE_KEY, make sure you add it via env vars. If you are using it on heroku, use secrets management page. In the meantime, service will still work since it will extract an older mmdb file'
  )
  rs.pipe(zlibTransform())
    .pipe(tarfsWritable(() => {}))
    .on('error', err => {
      console.error(err.message)
      process.exit(1)
    })
    .on('finish', () => {
      console.log('Extracted old mmdb file')
    })
} else {
  console.log('Key found, updating mmdb...')
  download()
    .then(_buffer => {
      console.log('Mmdb updated successfully')
    })
    .catch(err => {
      console.error(err.message)
      process.exit(1)
    })
}
