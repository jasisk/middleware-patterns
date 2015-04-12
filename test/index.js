var request = require('supertest');
var kraken = require('kraken-js');
var express = require('express');
var test = require('tape');
var path = require('path');

var BASEDIR = path.join(__dirname, '..');


expect('whitelist', {
  '/': 200,
  '/other': 200,
  '/maybe': 200,
  '/auth': 401,
  '/auth/other': 401
});

expect('blacklist', {
  '/': 200,
  '/other': 200,
  '/maybe': 401,
  '/auth': 401,
  '/auth/other': 401
});

// auth routes are 503 because the sub app is (generally)
// still starting at this point. Super brittle, I know.
// I need to think of a better solution here.
expect('subapp', {
  '/': 200,
  '/other': 200,
  '/maybe': 200,
  '/auth': 503,
  '/auth/other': 503
});


function expect(env, map) {
  test(env, function (t) {

    create(env, function (app, clean) {
      var agent;

      agent = request.agent(app);
      t.on('end', clean);

      Object.keys(map).forEach(function (route) {
        var status = map[route];

        t.test(route + ' - ' + status, function (t) {
          agent
            .get(route)
            .expect(status)
            .end(function (err) {
              t.error(err, route + ' should be ' + status);
              t.end();
            });
        });
      });
    });
  });
}

function create(env, cb) {
  var oldEnv = process.env.NODE_ENV;
  var app = express();

  process.env.NODE_ENV = env;

  app.use(kraken({ basedir: BASEDIR }));

  app.on('start', function () {
    cb(app, function () {
      process.env.NODE_ENV = oldEnv;
    });
  });
}
