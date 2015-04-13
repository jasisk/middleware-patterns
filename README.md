# middleware-patterns

1. [whitelist pattern](#whitelist-pattern)
2. [blacklist pattern](#blacklist-pattern)
3. [subapp pattern](#subapp-pattern)

## whitelist pattern

The whitelist pattern is for middleware that is intended to run on one or more paths, defined explicitly.

The simplist case is when a middleware is intended to be run on any routes with the same starting path (e.g., `/auth` or `/secret/bat/cave`). In this case, [simply define a `route` in your meddleware config with that namespace](https://github.com/jasisk/middleware-patterns/blob/ab4008845497d9f428a32f86f2231d0f7f1e81b4/config/whitelist.json#L6).

See a working example by running `npm run whitelist`

## blacklist pattern

The blacklist pattern relies on the way express builds its route-map, internally. Each route you define is converted to an equivalent RegExp by means of the [`path-to-regexp` module](https://github.com/pillarjs/path-to-regexp). We can exploit this fact to build [a route with one or more negative lookaheads](https://github.com/jasisk/middleware-patterns/blob/ab4008845497d9f428a32f86f2231d0f7f1e81b4/config/blacklist.json#L6).

See a working example by running `npm run blacklist`

### warning
If you use the blacklist pattern, verify the generated regex is what you want. You can generate the regex with [`path-to-regex@0.1.3`](https://github.com/pillarjs/path-to-regexp/tree/v0.1.3) and check it against a regex visualizer like [regulex](http://jex.im/regulex). **Don't forget about optional trailing slashes.**

## subapp pattern

The subapp pattern involves [writing a standalone application](https://github.com/jasisk/middleware-patterns/tree/ab4008845497d9f428a32f86f2231d0f7f1e81b4/sub) which works the way you like (e.g, with specific middleware), and then [mounting that application into a parent application](https://github.com/jasisk/middleware-patterns/blob/ab4008845497d9f428a32f86f2231d0f7f1e81b4/config/subapp.json#L6). Each app will have its own set of rendering engines, configs, routes, etc.

One thing to note is that the sub-application must [expose its `app` instance by exporting it](https://github.com/jasisk/middleware-patterns/blob/ab4008845497d9f428a32f86f2231d0f7f1e81b4/sub/index.js#L20) and should only [`listen` when it is running standalone](https://github.com/jasisk/middleware-patterns/blob/ab4008845497d9f428a32f86f2231d0f7f1e81b4/sub/index.js#L11-L14).

See a working example by running `npm run subapp`  
Confirm things work standlone by running `npm run subapp-standalone`

## available routes

* `/` - always no auth
* `/other` - always no auth
* `/maybe` - auth if blacklist, no auth if whitelist, no auth if subapp
* `/auth` - always auth
* `/auth/other` - always auth

## credentials
`admin` / `password`
