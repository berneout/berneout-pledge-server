module.exports = startTestServer

var handler = require('./')
var http = require('http')

function startTestServer(callback, port) {
  port = ( port || 0 )
  http.createServer(handler).listen(port, function() {
    callback(this.address().port, this.close.bind(this)) }) }

if (!module.parent) {
  var port = ( process.env.PORT || 8080 )
  startTestServer(
    function(port) {
      process.stdout.write('Listening on port ' + port + '\n') },
    port) }
