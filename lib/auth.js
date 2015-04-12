var auth = require('basic-auth');

module.exports = function (name, pass) {
  function unauthorized(req, res) {
    req.session.authTries = (req.session.authTries || 0) + 1;

    if (req.session.authTries > 3) {
      delete req.session.authTries;
      return res.sendStatus(403);
    }
    
    res.set({'WWW-Authenticate': 'Basic realm="Restricted"'}).sendStatus(401);
  }

  return function authenticate(req, res, next) {
    var meta;

    meta = auth(req);

    if (!meta || meta.name !== name || meta.pass !== pass) {
      return unauthorized(req, res);
    }

    req.username = name;
    delete req.session.authTries;
    next();
  };
};
