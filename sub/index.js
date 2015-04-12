var express = require('express');
var kraken = require('kraken-js');
var app = express();

app.use(function (req, res, next) {
  debugger;
  next();
}, kraken());

app.on('start', function () {
  if (require.main === module) {
    app.listen(8000).on('listening', function () {
      console.log('[env: %s] listening on %d ...', app.kraken.get('env:env'), this.address().port);
    });
  } else {
    console.log('kraken initialized for sub-app');
  }
});

module.exports = function () { return app; };
