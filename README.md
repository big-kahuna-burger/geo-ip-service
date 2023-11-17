# Geo IP lookup service

TLDR
HTTP Middleware to look up geo information by IP. Using [maxmind](http://maxmind.com)'s binary database format.


Usually we run this as a microservice and expose to other services that want to dynamically fetch it, getting a blazing fast results due to cache usage, rather than installing it in every project which might need it.
## Project

Instalation:
```sh
npm install --save geo-ip-service
```

Usage:

Package exports 3 modules
- iplookup (an initialized Reader if you want to use it directly in your code by giving it an IPv4 or IPv6 address)
- getMiddleware (a factory function if you want to mount it to your existing server application as a middleware, see examples/)
- createServer (if you want to simply run it as individual http service, see example/native-http.js)

Updating using postinstall script:
- if you provide it with a MAXMIND_LICENSE_KEY in env vars, a postinstall script will update the database with the latest one from maxmind servers. 
In case that headers from maxminds origin server [Last Modified] matches state on disk, it will skip download, so you don't get downloads happening on repeated npm installs 


[npm-url]: https://www.npmjs.com/package/geo-ip-service
[npm-image]: https://img.shields.io/npm/v/geo-ip-service.svg?style=flat-square
