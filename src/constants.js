const path = require('path')
// eslint-disable-next-line
const license_key = process.env.MAXMIND_LICENSE_KEY
const { stringify } = require('querystring')

const query = stringify({
  edition_id: 'GeoIP2-City',
  suffix: 'tar.gz',
  license_key
})

const maxMindHost = 'https://download.maxmind.com'
const maxMindPath = `/app/geoip_download?${query}`

const fixtureTgzFile = path.join(
  'tests',
  'fixtures',
  `GeoIP2-City_20170404.tar.gz`
)
const defaultUrl = `${maxMindHost}${maxMindPath}`
const dbPath = path.join(__dirname, '.vendor', 'GeoIP2-City.mmdb')

module.exports = {
  vendorDir: path.join(__dirname, '.vendor'),
  dbPath,
  defaultUrl,
  fixtureTgzFile,
  maxMindHost,
  maxMindPath
}
