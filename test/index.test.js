var concat = require('concat-stream')
var http = require('http')
var meta = require('../package.json')
var server = require('../server')
var tape = require('tape')

tape('GET /', function(test) {
  test.plan(1)
  server(function(port, done) {
    var request = { method: 'GET', port: port, path: '/' }
    http.request(request, function(response) {
      response.pipe(concat(function(buffer) {
        test.same(
          JSON.parse(buffer),
          { service: meta.name, version: meta.version },
          'GET / -> service metadata')
        done()
        test.end() })) })
    .end() }) })

tape('POST /', function(test) {
  test.plan(1)
  server(function(port, done) {
    var request = { method: 'POST', port: port, path: '/' }
    http.request(request, function(response) {
      test.same(response.statusCode, 405, 'POST / -> 405')
      done()
      test.end() })
    .end() }) })
