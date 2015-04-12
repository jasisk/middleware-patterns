# middleware-patterns

1. whitelist pattern
2. blacklist pattern
3. subapp pattern

## whitelist pattern

The whitelist pattern is for middleware that is intended to run on one or more paths (defined explicitly).

The simplist case is when a middleware is intended to be run on any routes with the same starting path (e.g., `/auth` or `/secret/bat/cave`). In this case, simply define a `route` in your meddleware config with that namespace.

See a working example by running `npm run whitelist`

## blacklist pattern

The black list pattern relies on the way express builds its route map, internally. Each route you define is converted to an equivalent RegExp by means of the `path-to-regex` module. We can exploit this fact to build a route with one or more negative lookaheads.

See a working example by running `npm run blacklist`

### warning
If you use the blacklist pattern, verify the generated regex is what you want. You can generate the regex with `path-to-regex@0.1.3` and check it against a regex visualizer like [regulex](http://jex.im/regulex). **Don't forget about optional trailing slashes.**

## subapp pattern

The subapp pattern involves writing a standalone application which works the way you like (e.g, with specific middleware), and then mounting that application into a parent application. Each app will have its own set of rendering engines, configs, routes, etc.

See a working example by running `npm run subapp`  
Confirm things work standlone by running `npm run subapp-standalone`

## available routes:

* `/` - always no auth
* `/other` - always no auth
* `/maybe` - auth if blacklist, no auth if whitelist, no auth if subapp
* `/auth` - always auth
* `/auth/other` - always auth

u/p for auth: `admin` / `password`
