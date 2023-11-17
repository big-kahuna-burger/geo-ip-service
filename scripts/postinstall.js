import { download } from '../src/download-utils.js'

const { MAXMIND_LICENSE_KEY, MAXMIND_LITE_LICENSE_KEY } = process.env

if (!(MAXMIND_LICENSE_KEY || MAXMIND_LITE_LICENSE_KEY)) {
  console.warn('No MAXMIND_LICENSE_KEY or MAXMIND_LITE_LICENSE_KEY environment variables found. Db will not be updated')
  console.info('You can get your own license key from maxmind here: https://www.maxmind.com/en/geolite2/signup')
  process.exit(0)
}

download()
  .then(({ buffer, lastModified }) => {
    if (buffer) {
      console.info('Mmdb binary file updated successfully!')
    } else {
      console.info('Mmdb file is up to date. No need to download a new one.')
    }
    console.info(`Lastest version published on ${lastModified}`)
    process.exit(0)
  })
  .catch(err => {
    console.error(err.message)
    process.exit(1)
  })
