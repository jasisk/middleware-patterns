module.exports = function (router) {

  router.get('/', function (req, res) {
    res.send('logged in as ' + req.username);
  });

  router.get('/other', function (req, res) {
    res.send('logged in here, too, as ' + req.username);
  });
};
