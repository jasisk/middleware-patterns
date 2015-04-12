var express = require('express');
var kraken = require('kraken-js');
var app = express();

app.use(kraken());

app.on('start', function () {
  app.listen(8000).on('listening', function () {
    console.log('[env: %s] listening on %d ...', app.kraken.get('env:env'), this.address().port);
  });
});

