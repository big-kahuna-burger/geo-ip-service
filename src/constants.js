import { stringify } from 'querystring'
import { join } from 'desm'
import path from 'path'

const licenseKey = process.env.MAXMIND_LICENSE_KEY
const liteLicenseKey = process.env.MAXMIND_LITE_LICENSE_KEY

const query = stringify({
  edition_id: 'GeoIP2-City',
  suffix: 'tar.gz',
  license_key: licenseKey
})

const freeEdition = stringify({
  edition_id: 'GeoLite2-City',
  suffix: 'tar.gz',
  license_key: liteLicenseKey
})

export const maxMindHost = 'download.maxmind.com'
export const maxMindPath = '/app/geoip_download?' + (licenseKey
  ? query
  : liteLicenseKey
    ? freeEdition
    : null)

export const fixtureTgzFile = join(
  import.meta.url,
  '..',
  'tests',
  'fixtures',
  'GeoIP2-City_20170404.tar.gz'
)

export const dbPath = join(import.meta.url, '..', '.vendor', licenseKey ? 'GeoIP2-City.mmdb' : 'GeoLite2-City.mmdb')
export const vendorDir = join(import.meta.url, '..', '.vendor')
export const defaultUrl = `https://${maxMindHost}${maxMindPath}`
export const dateFile = path.join(vendorDir, '.last-modified-time')
export const finalDest = path.join(process.cwd(), '.vendor', '.final.mmdb')