import reader from './reader.js'

const iplookup = async (ip) => {
  return new Promise((resolve, reject) => {
    try {
      const info = reader.get(ip)
      resolve(info)
    } catch (error) {
      reject(error)
    }
  })
}

export default iplookup
