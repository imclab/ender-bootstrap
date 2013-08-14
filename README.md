# Ender Bootstrap &mdash; Bootstrap for Ender

This is a port of **v2** of
[Bootstrap](http://github.com/twbs/bootstrap) for Ender, using only
[Qwery](https://github.com/ded/qwery),
[Bonzo](https://github.com/ded/bonzo),
[Bean](https://github.com/fat/bean).
[Traversty](https://github.com/rvagg/traversty),
[domReady](https://github.com/ded/domready) and
[Bowser](https://github.com/ded/bowser).

This project builds upon the v1.x port which can still be found at
https://github.com/rvagg/bootstrap and is available in NPM as
*ender-twitter-bootstrap*

Why use this? Because you're either using Ender now and want to use
Bootstrap plugins too, or because you want to avoid [the
beast](http://jquery.com) and make your users download only *1/2 the
amount of JavaScript* (the whole lot weighs in at 47% of the size,
minified & gzipped, of a jQuery-based Bootstrap install).

## Current status

All good @2.2.1! A couple of very minor features are not available, most notably
he ability to `preventDefault()` on custom emitted events as Bean does
not support the full `$.Event` jQuery API. However this is not a commonly
used or well documented feature of Bootstrap.

## Using

NPM contains a package for each of the Bootstrap plugins:

 * ender-bootstrap-affix
 * ender-bootstrap-alert
 * ender-bootstrap-button
 * ender-bootstrap-carousel
 * ender-bootstrap-collapse
 * ender-bootstrap-dropdown
 * ender-bootstrap-modal
 * ender-bootstrap-popover
 * ender-bootstrap-scrollspy
 * ender-bootstrap-tab
 * ender-bootstrap-tooltip
 * ender-bootstrap-typeahead

(See the Bootstrap home for details about each of these)

Which all depend on two base packages:

 * ender-bootstrap-base
 * ender-bootstrap-transition

Or, you can install the lot with the *virtual* package:

 * **ender-bootstrap**

### Installing

#### The *proper* way

Even though the dependencies are set up in the packages, you need to
specify the required dependencies on the command line when running
*ender*, otherwise they will end up installed in your *ender.js* file
*after* the Ender Bootstrap packages unless you are using the current
*1.0-wip* development branch of the Ender CLI. So install like this:

```
 $ ender build qwery qwery-pseudos bonzo bean traversty domready bowser ender-bootstrap-base ender-bootstrap-transition ender-bootstrap-alert

 # or, for the whole hog

 $ ender build qwery qwery-pseudos bonzo bean traversty domready bowser ender-bootstrap
```

Also note that Qwery is an optional dependency so you can switch it
out for another selector engine supported by Ender, such as
[Sel](https://github.com/amccollum/sel),
[Sizzle](https://github.com/jquery/sizzle) or
[NWMatcher](https://github.com/dperini/nwmatcher). If you do use Qwery
then you also need to install the *qwery-pseudos* package (although
currently it's only essential to make tabs with dropdowns work).

#### The *easy* way

If you don't want to roll your own then you can download (or link to) a
pre-built version which I'll keep updated:

 * http://rvagg.github.com/ender-bootstrap/ender-bootstrap.js
 * http://rvagg.github.com/ender-bootstrap/ender-bootstrap.min.js

This build has all of the Bootstrap plugins installed plus the Ender
dependencies: Qwery, Bonzo, Bean, Traversty, domReady and Bowser so you get lots of
goodness.

### Demo

Of course you want to see it in action! Head over to
http://rvagg.github.com/ender-bootstrap/ to see it live.

### Building & contributing

If you'd like to contribute (fixes, improvements, whatever) then I'd
love to hear from you! In this repo you'll find a `build` script, simply
run it and it'll clone the main Bootstrap repo (*master*) and
then munge it to make it work with Ender and assemble the packages ready
for NPM. The altered files end up in the *dist/* directory but it will
also fix up the *javascript.html* demo page and associated
*application.js* and put them into the *doc/* directory.

Sadly there are no tests to go along with this, the jQuery dependencies
in the QUnit tests mean that it's not a trivial job to fix them up (but
of course I'd love someone to help make this work!). So testing at this
stage is largely a matter of using the demo page against the latest
build across all browsers.

### Important notes for Ender users

**The ender-bootstrap-base package has side-effects that will alter the
way that some parts of Ender work.** Mostly these are fairly minor and
are there to make Ender behave more like jQuery in some situations but
you may need to be aware of them depending on how you use Ender.

Most of the jQueryfication takes place in a private instance of `ender`
which doesn't leak out, but there are some changes to internal chain
functions that do leak.

#### Ender side-effects

 * `$().map()` (Bonzo) is modified to accept argument-less callbacks
   like jQuery. If you feed it a callback with zero-arguments it'll
   invoke your callback and use `this` as the current element.
 * `$().on()` (Bean) is modified to behave like jQuery's implementation
   in some situations. (1) with 3 arguments where the second is not a
   string (i.e. a 'data' variable), the second argument is stripped out
   cmpletely, this is not supported by Bean and not required by
   Bootstrap. (2) with 3 arguments where the second is a string, (i.e. a
   delegated listener with a selector argument in second place) remap
   the call to `bean.on()` to put the selector first. This is only required
   for Bean 0.4.x, as of 1.0, Bean supports the same argument order as
   jQuery.
 * `$().trigger()` (Bean) has been modified to prevent it accepting (and
   throwing an error) on non-string arguments. This means that there are
   some events that Bootstrap fires that won't see the light of day. If
   his is important to anyone then file a but report and it can be
   fixed up.
 * `$().data()` (Bonzo) is modified so it can handle JSON arrays, it
   simply looks at the first character, if it's a `'['` then it'll try
   `JSON.parse()` (modern browsers) or a naive split. This is required
   for *typeahead* where you specify the list in a *data-* property.
 * `$().index(el)` is implemented if it doesn't exist, it'll simply return
   the index of the given element in the current list, or -1 if it's not
   there. No-arg version is not supported.
 * `$().sort()` is implemented to sort the current list of elements by
   the given comparator function.

See
[base.js](https://github.com/rvagg/ender-bootstrap/blob/master/base/base.js)
for all the gory details.
