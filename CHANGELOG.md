# CHANGELOG

## dev
* update dependencies 🚀

## v6.1.0
* add new polyfills
* update dependencies 🚀
* update docs 📝
* update preview layout include
* update font-weight definitions

## v6.0.1
* update configs for webpack v4
* update sass&susy dependencies

## v6.0.0
* update switch pattern demo
* update icon sprite workflow
* update packages (webpack to v4)
* fix webfont handling with webpack

## v6.0.0-rc.1
* remove fabricator as pattern library generator
  * add clearlet's fractal
  * change folder structure
  * change patterns to hbs file format
* remove gulp as taskrunner, use yarn/npm scripts
* update patterns
  * checkbox now with checkmark
  * checkbox and radio as standalone atoms (not i form collection)
  * remove grid styles

## v5.4.0
* add prism as dependency
* rewrite tab (without jQuery)
* rewrite topbar (without jQuery)
* rewrite dom ready (without jQuery)
* remove jQuery

## v5.3.0
* update pattern item view with a "transparent" background
* update pattern control styles
* add pattern background toggle button

## v5.2.0
* remove scroll-to.js js from partystreusel
* rewrite dropdown.js (without jQuery)
* rewrite accordion.js (without jQuery)
* rewrite offcanvas.js (without jQuery)
* add element-closest polyfill
* add moveTo plugin as dependencies
 * use moveTo in accordion.js

## v5.1.1
* update dependencies

## v5.1.0
* update node version & dependencies
* add input-addon as molecule (instead of form atom)
* add switch active/inactive text
* refactor switch
* rename `embeds` to `embed`
* refactor tab
* refactor topbar
* refactor main-nav
* fix accordion markup
* update button colors
* update dropdown js
* rename scrollto molecule files

## v5.0.1
* update js gulp task: don'to stop on eslint error in dev mode.
* fix #29: disable pointer events for icons in buttons

## v5.0.0

## v5.0.0-rc.2
* rename button-group classname
* cleanup sass files & sass settings
* add gulp-release-tag plugin
* use name from package.json for index.html Title and title tags
* better path management in gulpfile
  * simplified for use with kirby or other CMS
  * set `partystreuselRoot` and `config.dest` paths

## v5.0.0-rc.1
* replace coffeescript with js
* upgrade js code to ES6
* upgrade Babel & Webpack
* use vendor stuff from node_modules

## v4.7.0
* replace neat grid system with susy
* add yarn support
* add "inProgress" state for materials

## v4.6.0
* refactor css (and demo of atoms) for input fields
* refactor radio/checkbox styling, with class `option`.

## v4.5.2
* update normalize to v5.0.0
* include normalize with npm instead of vendor file

## v4.5.1
* add handlebars helper "increment"

## v4.5.0
* remove molecules teaser, linklist, iconbar
* remove jquery cycle plugin (used for slider)
* add vendor flickity.js (used for slider)
* update vendor jquery to 3.1.1
* update node version in nvrmc
* update colors
* update placeholder images
* update active class names in topbar, main-nav, accordion (BREAKING)
* update main-nav & header styles
* update header (remove offcanvas, BREAKING)
* add offcanvas organism (in progress)

## 4.4.1
* node v4.5.0 is defined in nvrmc
* fix image markup

## 4.4.0
* update color variables (naming)
* update button styles
* replace button class `btn--secondary` with `btn--primary`
* remove read-more molecule

## 4.3.0
* add stylelint rules
* lint styles (descending specificity)
* update gulp deploy task to run clean/build/deploy:github
* update use of Sass color variables

## 4.2.1
* add styling for pattern library notes

## 4.2.0
* move grid from molecules to atoms
* update stylelint config as dependency (stylelint-config-partystreusel)
* update gulp tasks for imagemin (because of imagemin update)

## 4.1.1
* fix gulp task "svgsprite"
* fix no-js handling

## 4.1.0
* lint styles
* refactor switch
* improve form semantic

### packages/gulp
* add stylelint
* add gulp-uglify
* update gulpfile
  * run csso in production
  * improve minify of images/icons
* remove scss-lint
* remove polyfills
  * html5shiv
  * rem

## 4.0.0
* change structure to atomic design
* use fabricator-assemble package
* switch from jade to html (with handlebars)
* extend media-query mixin
* simplify icon system
  * remove gulpicon, remove png fallbacks
* define node.js version to v4.4.1 in nvrmc

## 3.2.3
* fix typo.scss
* cleanup gulfpile & requires
* add font files handling in gulp
* add .editorconfig

## 3.2.2
* fix back-to-index link
* add no-js styling for offcanvas

## 3.2.1
* add header styles
* update vendor files
  * normalize to v3.0.2
  * jquery to v2.2.0
  * modernizr to v3.3.0

## 3.2.0
* add markdown documentation for jade files (via block)
* change jade blocks
* change icon preview
* change sass variable naming
* add word-break mixin
* rename utility classes
* remove offcanvas & main-nav from layout, now modules

## 3.1.0
* add autoprefixer (remove prefixin with bourbon)
* add sourcemaps for Sass
* add sftp deploy
* add gh-pages deploy
* update gulp plugins
* change to modular file structure
* change Sass variables to BEM style

## 3.0.0
* switch from grunt to gulp
* replace grunticon with gulpicon
* switch from sass to scss syntax
* switch from haml to jade
* add browser-sync for local server
* add gulp compilation of sass, coffee, jade, bourbon, neat, icons, ...
* add .nvrmc file for nvm
* add scss-lint.yml (for local scss-lint in e.g. sublime) with rules
* lint all sass files
* remove ruby & middleman dependency

## 2.0.0

* Last release for rails&middleman
* fix engine mounting
* a few bugfixes

## 1.2.0

* Various modules added/moved over from rails_template

## 1.1.1
* Mark offcanvas active link

## v1.1.0
* Refactored Readmore
* Add Offcanvas, Tab, Accordion, Slider JS
* Add events

## v1.0.8
* IE8 fixes (readmore, ie_fixes did not work in IE8)

## v1.0.7
* Fixed issue which broke streusel when minified.

## v1.0.6
* Make partystreusel loadable in middleman

## v1.0.5
* Updated readmore translations (Show less, Weniger anzeigen)

## v1.0.3 - 2014-06-23
* IE Bugfix (toDownCase error)

## v1.0.0 - 2014-06-05

* Complete rework with jasmine testing
* Implemented modules:
  * Read More
  * Scroll To
