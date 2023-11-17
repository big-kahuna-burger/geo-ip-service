import { open } from 'maxmind'
import { finalDest } from './constants.js'
import { lru } from 'tiny-lru'

const cache = lru(10000, 3e6, false)

const reader = await open(finalDest, {
  cache,
  watchForUpdates: true,
  watchForUpdatesHook: () => {
    cache.clear()
    console.info('reader updated and cache cleared')
  }
})

export default reader
