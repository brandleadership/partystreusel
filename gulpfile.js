'use strict';

// modules
var gulp          = require('gulp');
var gutil         = require('gulp-util');
var gulpif        = require('gulp-if');
var del           = require('del');
var csso          = require('gulp-csso');
var rename        = require('gulp-rename');
var assemble      = require('fabricator-assemble');
var webpack       = require('webpack');
var runSequence   = require('run-sequence');
var browserSync   = require('browser-sync');
var coffee        = require("gulp-coffee");
var include       = require('gulp-include');
var concat        = require('gulp-concat');
var addsrc        = require('gulp-add-src');
var imagemin      = require('gulp-imagemin');
var svgSymbols    = require('gulp-svg-symbols');
var glob          = require('glob');
var sass          = require('gulp-sass');
var sourcemaps    = require('gulp-sourcemaps');
var bourbon       = require('node-bourbon').includePaths;
var neat          = require('node-neat').includePaths;
var autoprefixer  = require('gulp-autoprefixer');
var notify        = require('gulp-notify');
var sftp          = require('gulp-sftp');
var ghPages       = require('gulp-gh-pages');
var metadata      = require('./package.json');

// configuration
// ----------------------------------------
var config = {
	dev: gutil.env.dev === true ? true : false,
	src: {
		scripts: {
			fabricator: [
        './src/_styleguide/fabricator/scripts/fabricator.js',
				'./src/_styleguide/fabricator/scripts/partystreusel.js'
      ],
			application: './src/application.coffee',
      vendor:      './src/vendor/*.js',
      polyfills:   'src/vendor/polyfills/*'
		},
		styles: {
			fabricator: 'src/_styleguide/fabricator/styles/fabricator.scss',
			application: 'src/application.scss'
		},
    fonts:  'src/materials/atoms/fonts/*.{eot,woff,woff2,ttf,svg}',
		images: [
      'src/images/**/*',
      '!src/images/icons/*'
    ],
    icons:  'src/images/icons/*.svg',
    iconsystem:  'src/materials/atoms/icons'
	},
	dest: 'dist',
  remotePath:   '/home/www-data/REPLACEME/',
  browsers: ['last 2 versions', 'ie 9', '> 1%']
};

// webpack
// ----------------------------------------
var webpackConfig = require('./webpack.config')(config);
var webpackCompiler = webpack(webpackConfig);

// clean
// ----------------------------------------
gulp.task('clean', function () {
	return del([config.dest]);
});

// STYLES
// ----------------------------------------
gulp.task('styles:fabricator', function () {
	return gulp.src(config.src.styles.fabricator)
    .pipe(sass({
      includePaths: neat
    }).on('error', notify.onError()))
		.pipe(autoprefixer(config.browsers))
		.pipe(gulpif(config.dev, csso()))
		.pipe(rename('p.css'))
		.pipe(gulp.dest(config.dest + '/assets/partystreusel/styles'))
		.pipe(gulpif(config.dev, browserSync.reload({stream:true})));
});

gulp.task('styles:application', function () {
	return gulp.src(config.src.styles.application)
    .pipe(gulpif(config.dev, sourcemaps.init()))
		.pipe(sass({
      includePaths: neat
    }).on('error', notify.onError()))
		.pipe(autoprefixer(config.browsers))
		.pipe(gulpif(config.dev, csso()))
		.pipe(gulpif(config.dev, sourcemaps.write('./')))
		.pipe(gulp.dest(config.dest + '/assets/styles'))
		.pipe(gulpif(config.dev, browserSync.reload({stream:true})));
});

gulp.task('styles', ['styles:fabricator', 'styles:application']);

// SCRIPTS
// ----------------------------------------
gulp.task('scripts', function (done) {
	webpackCompiler.run(function (error, result) {
		if (error) {
			gutil.log(gutil.colors.red(error));
      notify.onError()
		}
		result = result.toJson();
		if (result.errors.length) {
			result.errors.forEach(function (error) {
				gutil.log(gutil.colors.red(error));
			});
		}
		done();
	});
});

gulp.task('coffee', function() {
  gulp.src(config.src.scripts.application)
    .pipe(include())
    .pipe(coffee())
    .pipe(addsrc.prepend(config.src.scripts.vendor))
    .pipe(concat("application.js"))
    .pipe(gulp.dest(config.dest + '/assets/scripts'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('polyfills', function() {
  gulp.src(config.src.scripts.polyfills)
    .pipe(gulp.dest(config.dest + '/assets/scripts/polyfills'))
});


// IMAGES
// ----------------------------------------
gulp.task('images', function () {
	return gulp.src(config.src.images)
    .pipe(imagemin({
      progressive: true
    }))
		.pipe(gulp.dest(config.dest + '/assets/images'));
});

// ICONS
// ----------------------------------------

gulp.task('svgmin', function () {
	return gulp.src(config.src.icons)
    .pipe(imagemin({
      svgoPlugins: [{removeViewBox: false}]
    }));
});

gulp.task('svgsprite', function () {
  gulp.src(config.src.icons)
    .pipe(svgSymbols({
      id:     'icon--%f',
      title:  'icon %f',
      templates: [
				config.src.iconsystem + '/_icon-sprite-template.svg',
				config.src.iconsystem + '/_icons-preview-template.html'
			]
    }))
		.pipe(gulpif( /[.]svg$/, rename('icon-sprite.svg')))
    .pipe(gulpif( /[.]svg$/, gulp.dest(config.dest + '/assets/images/icons')))
		.pipe(gulpif( /[.]html$/, rename('all-icons.html')))
		.pipe(gulpif( /[.]html$/, gulp.dest(config.src.iconsystem)));
});

// Icon workflow
gulp.task('icons', ['svgmin', 'svgsprite']);


// Fonts
// ----------------------------------------
gulp.task('fonts', function() {
  return gulp.src(config.src.fonts)
   .pipe(gulp.dest(config.dest + '/assets/fonts'));
});

// assemble
// ----------------------------------------
gulp.task('assemble', function (done) {
	assemble({
		logErrors: config.dev,
    layout: 'partystreusel',
    layouts: 'src/materials/templates/*.html',
    layoutIncludes: 'src/_styleguide/fabricator/layouts/includes/*',
    views: ['src/_styleguide/fabricator/views/**/*', 'src/pages/**/*'],
    materials: 'src/materials/**/!(_)*.html',
    data: 'src/materials/**/*.{json,yml}',
    docs: ['docs/**/*.md', 'src/materials/**/*.md'],
    helpers: {
			currentVersion: function() {
				return metadata.version;
			}
		}
	});
	done();
});

// DEPLOY
// ----------------------------------------
gulp.task('deploy', function () {
  return gulp.src('dist/**/*')
    .pipe(sftp({
      host: 'php1.brandleadership.ch',
      user: 'www-data',
      remotePath: config.remotePath
    }));
});

gulp.task('deploy:github', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

// SERVER
// ----------------------------------------
gulp.task('serve', function () {

	browserSync({
		server: {
			baseDir: config.dest
		},
		notify: false,
		logPrefix: 'FABRICATOR'
	});

	/**
	 * Because webpackCompiler.watch() isn't being used
	 * manually remove the changed file path from the cache
	 */
	function webpackCache(e) {
		var keys = Object.keys(webpackConfig.cache);
		var key, matchedKey;
		for (var keyIndex = 0; keyIndex < keys.length; keyIndex++) {
			key = keys[keyIndex];
			if (key.indexOf(e.path) !== -1) {
				matchedKey = key;
				break;
			}
		}
		if (matchedKey) {
			delete webpackConfig.cache[matchedKey];
		}
	}

	gulp.task('assemble:watch', ['assemble'], browserSync.reload);
	gulp.watch(['docs/*.md','src/**/*.{html,md,json,yml}'], ['assemble:watch']);

	gulp.task('styles:fabricator:watch', ['styles:fabricator']);
	gulp.watch('src/_styleguide/fabricator/styles/**/*.scss', ['styles:fabricator:watch']);

	gulp.task('styles:application:watch', ['styles:application']);
	gulp.watch('src/**/*.scss', ['styles:application:watch']);

	gulp.task('scripts:watch', ['scripts'], browserSync.reload);
	gulp.watch('src/_styleguide/fabricator/scripts/**/*.js', ['scripts:watch']).on('change', webpackCache);

  gulp.task('coffee:watch', ['coffee'], browserSync.reload);
	gulp.watch('src/materials/**/*.coffee', ['coffee:watch']);

  	gulp.task('images:watch', ['images'], browserSync.reload);
	gulp.watch(config.src.images, ['images:watch']);

});

gulp.task('build', ['default']);

// DEFAULT BUILD TASK
// ----------------------------------------
gulp.task('default', ['clean'], function () {
	// define build tasks
	var tasks = [
		'styles',
    'scripts',
		'coffee',
    'polyfills',
    'fonts',
		'images',
    'icons',
		'assemble'
	];

	// run build
	runSequence(tasks, function () {
		if (config.dev) {
			gulp.start('serve');
		}
	});

});
