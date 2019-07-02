# Geo IP lookup service

[![npm][npm-image]][npm-url]

HTTP API to look up geo information by IP. Uses [maxmind](http://maxmind.com).

## Project

This service:

- run `npm install` followed by `npm start`,
- (install will take a bit depending on your internet connection, downloads a file ~55-60Mb on clean install)
- if you provide MAXMIND_LICENSE_KEY, postbuild script will update the database with the latest one from maxmind servers (TODO)
- if all goes well server should be listening @ `localhost:3000` or whatever port you provide via env vars

## Deploying to Heroku

```sh
heroku create
git push heroku master
heroku open
```

or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/big-kahuna-burger/geo-ip-service)

## Documentation

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)

[npm-url]: https://www.npmjs.com/package/geo-ip-service
