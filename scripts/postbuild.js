if (!process.env.MAXMIND_LICENSE_KEY) {
  console.warn(
    'no MAXMIND_LICENSE_KEY, make sure you add it via env vars. If you are using it on heroku, use secrets management page'
  )
  process.exit(1)
}
