module.exports = function (router) {
  router.get('/', function (req, res) {
    res.send('no auth in here');
  });
  router.get('/other', function (req, res) {
    res.send('no auth in here, either');
  });
  router.get('/maybe', function (req, res) {
    res.send(req.username ? 'you are logged in as ' + req.username : 'no auth necessary');
  })
};
