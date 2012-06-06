var config = {
        packages: 'alert button carousel collapse dropdown modal popover scrollspy tab tooltip transition typeahead'.split(' ')
      , bootstrapGit: 'https://github.com/twitter/bootstrap.git'
      , bootstrapSrc: 'bootstrap-git'
      , jsdocin: 'bootstrap-git/docs/javascript.html'
      , jsdocappin: 'bootstrap-git/docs/assets/js/application.js'
      , jsdocout: 'doc/javascript.html'
      , jsdocappout: 'doc/application.js'
      , version: '2.0.3-1'
      , outdir: 'dist/{package}'
    }

  , colors = require('colors')

  , git = require('./git')
  , process = require('./process')

  , processPackages = function () {
      config.packages.forEach(function (pkg) {
        console.log(('Processing ' + pkg + '...').green)
        process.processPackage(config, pkg)
      })
      process.fixDoc(config)
    }

  , exec = function (args) {
      if (args.length > 2 && args[2] == '-nc') {
        processPackages()
      } else {
          git.clone(config, function () {
          processPackages()
        })
      }
    }

module.exports = exec
