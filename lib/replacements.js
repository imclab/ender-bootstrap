var replacements = [
        { // replace the }(window.jQuery) at the bottom with ender
            packageMatch: /^([^_]+|_jsdocapp)$/
          , regex: /^\s*\}\(\s*window\.jQuery\s*\);?\s*$/m
          , replace: '}(require(\'ender-bootstrap-base\'))'
        }
      , { // replace $(function () with domReady
            packageMatch: /.*/
          , regex: /\$\(\s*function\s*\(\s*\)\s*\{/
          , replace: '$.domReady(function () {'
        }

      , { // make up for lack of proper $().parent('selector') by doing a check that we got what we were selecting for
            packageMatch: /button/
          , regex: /\$parent && \$parent[^\.]*\.find\('\.active'\)[^\.]*\.removeClass\('active'\)/
          , replace: '$parent && $(this.$element.parent()).data(\'toggle\') == \'buttons-radio\' && $parent.find(\'.active\').removeClass(\'active\')'
        }
      , { // enforce a display:block for the modal show()
            packageMatch: /modal/
          , regex: /that\.\$element\s+\.show\(\)/
          , replace: 'that.$element.show(\'block\')'
        }
      , { // fix a 'return false' from an event handler
            packageMatch: /dropdown/
          , regex: /(toggle\: function \(\s?e\s?\) \{[\s\S]+)return false/
          , replace: '$1e.stop()'
        }
      , { // Qwery can't handle :disabled
            packageMatch: /dropdown/
          , regex: /\$this\.is\('\.disabled, :disabled'\)/
          , replace: '$this.is(\'.disabled\')'
        }
      , { // replace delegated 'focus' event with direct listener
            packageMatch: /typeahead/
          , regex: /\$\('body'\).on\('focus([^']+)', '\[([^\]]+)\]'/
          , replace: '$(\'[$2]\').on(\'focus$1\''
        }
      , { // switch callback arguments of $().map
            packageMatch: /typeahead/
          , regex: /\$\(([^)]+)\).map\(function \(([^,]+), ([^)]+)\) \{/
          , replace: '$($1).map(function ($3, $2) {'
        }
      , { // explicit show('block') for typeahead dropdown
            packageMatch: /typeahead/
          , regex: /this\.\$menu\.show\(\)/
          , replace: 'this.$menu.show(\'block\')'
        }
      , { // wrap results of $().map() in $()
            packageMatch: /typeahead/
          , regex: /items\.first\(\)/
          , replace: '$(items).first()'
        }
      , { // replace use of $().html(elements)
            packageMatch: /typeahead/
          , regex: /this\.\$menu\.html\(([^)]+)\)/
          , replace: 'this.$menu.empty().append($1)'
        }
      , { // replace use of $([]) for array initialisation
            packageMatch: /scrollspy/
          , regex: /this\.(offsets|targets) = \$\(\[\]\)/g
          , replace: 'this.$1 = []'
        }
      , { // replace use of $([]) for array initialisation
            packageMatch: /scrollspy/
          , regex: /targets\.last\(\)\[0\]/g
          , replace: 'targets[targets.length-1]'
        }
      , { // replace a 3d array with a 2d
            packageMatch: /scrollspy/
          , regex: /\[(\[[^\]]+\])\]/
          , replace: '$1'
        }
      , { // for use with $.Event() to track even state post-trigger, can't do it that way!
            packageMatch: /tab|collapse|alert|carousel|modal/
          , regex: /[a-zA-Z]+\.isDefaultPrevented\(\)/g
          , replace: 'false'
        }


      /***** javascript.html specifics *****/
      , {
            packageMatch: /^_jsdoc$/
          , regex: /<script src="assets\/js\/jquery.js"><\/script>/
          , replace: '<script src="ender.js"></script><script src="../base/base.js"></script>'
        }
      , {
            packageMatch: /^_jsdoc$/
          , regex: /<script src="assets\/js\/application.js"><\/script>/
          , replace: '<script src="application.js"></script>'
        }
      , {
            packageMatch: /^_jsdoc$/
          , regex: /<script src="assets\/js\/bootstrap-(\w+).js"><\/script>/g
          , replace: '<script src="../dist/$1/$1.js"></script>'
        }
      , {
            packageMatch: /^_jsdoc$/
          , regex: /(assets\/(js|css|img|ico)\/)/g
          , replace: 'http://twitter.github.com/bootstrap/$1'
        }
      , {
            packageMatch: /_jsdocapp/
          , regex: /\/\/ Modified from the original jsonpi .*\n(.+[\r\n]+)+\}\)/
          , replace: ''
        }
    ]

  , adjustScript = function (config, data) {
      replacements.forEach(function (replacement) {
        if (replacement.packageMatch.test(data.package)) {
          if (!data.script.match(replacement.regex))
            console.log(('WARNING: Regex "' + replacement.regex + '" is not found in "' + data.package + '"').yellow)
          else
            data.script = data.script.replace(replacement.regex, replacement.replace)
        }
      })
    }

module.exports.adjustScript = adjustScript
