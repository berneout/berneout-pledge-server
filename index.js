module.exports = handler

var hash = require('http-hash')
var parse = require('url').parse

var serviceMetadata = JSON.stringify(
  { service: require('./package.json').name,
    version: require('./package.json').version })

var routes = hash()

routes.set('/', function(request, response) {
  if (request.method === 'GET') {
    response.setHeader('Content-Type', 'application/json')
    response.end(serviceMetadata) }
  else {
    response.statusCode = 405
    response.end() } })

function handler(request, response) {
  var route = routes.get(parse(request.url).path)
  if (route.handler) {
    route.handler(request, response, route.params, route.splat) }
  else {
    response.statusCode = 404
    response.end() } }
