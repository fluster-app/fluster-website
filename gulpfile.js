const gulp = require('gulp');

const replace = require('replace');

const removeCode = require('gulp-remove-code');

const del = require('del');

const fs = require('fs');

gulp.task('copy-assets', function () {
  gulp.src('./src/assets/**/*')
    .pipe(gulp.dest('./dist/server/assets/'));

  gulp.src('./static/**/*')
    .pipe(gulp.dest('./dist/server/'));


  gulp.src('./node_modules/cookieconsent/build/*')
    .pipe(gulp.dest('./dist/server/assets/cookieconsent/'));
});

gulp.task('moment', function (cg) {
  del(['./node_modules/moment/locale/*', '!./node_modules/moment/locale/fr.js', '!./node_modules/moment/locale/de.js', '!./node_modules/moment/locale/it.js', '!./node_modules/moment/locale/en.js']);
});

gulp.task('prod', function () {
  gulp.src('./src/index.html')
    .pipe(removeCode({prod: true}))
    .pipe(gulp.dest('./src/'));

  gulp.src('./static/de/index.html')
    .pipe(removeCode({prod: true}))
    .pipe(gulp.dest('./static/de/'));

  gulp.src('./static/fr/index.html')
    .pipe(removeCode({prod: true}))
    .pipe(gulp.dest('./static/fr/'));

  gulp.src('./static/it/index.html')
    .pipe(removeCode({prod: true}))
    .pipe(gulp.dest('./static/it/'));

  gulp.src('./static/index_de.html')
    .pipe(removeCode({prod: true}))
    .pipe(gulp.dest('./static/'));

  gulp.src('./static/index_fr.html')
    .pipe(removeCode({prod: true}))
    .pipe(gulp.dest('./static/'));

  gulp.src('./static/index_it.html')
    .pipe(removeCode({prod: true}))
    .pipe(gulp.dest('./static/'));

  gulp.src('./static/termsofuse.html')
    .pipe(removeCode({prod: true}))
    .pipe(gulp.dest('./static/'));

  gulp.src('./static/termsofuse_de.html')
    .pipe(removeCode({prod: true}))
    .pipe(gulp.dest('./static/'));

  gulp.src('./static/termsofuse_fr.html')
    .pipe(removeCode({prod: true}))
    .pipe(gulp.dest('./static/'));

  gulp.src('./static/termsofuse_it.html')
    .pipe(removeCode({prod: true}))
    .pipe(gulp.dest('./static/'));
});

gulp.task('staging', function () {
  gulp.src('./src/index.html')
    .pipe(removeCode({staging: true}))
    .pipe(gulp.dest('./src/'));

  gulp.src('./static/de/index.html')
    .pipe(removeCode({staging: true}))
    .pipe(gulp.dest('./static/de/'));

  gulp.src('./static/fr/index.html')
    .pipe(removeCode({staging: true}))
    .pipe(gulp.dest('./static/fr/'));

  gulp.src('./static/it/index.html')
    .pipe(removeCode({staging: true}))
    .pipe(gulp.dest('./static/it/'));

  gulp.src('./static/index_de.html')
    .pipe(removeCode({staging: true}))
    .pipe(gulp.dest('./static/'));

  gulp.src('./static/index_fr.html')
    .pipe(removeCode({staging: true}))
    .pipe(gulp.dest('./static/'));

  gulp.src('./static/index_it.html')
    .pipe(removeCode({staging: true}))
    .pipe(gulp.dest('./static/'));

  gulp.src('./static/termsofuse.html')
    .pipe(removeCode({staging: true}))
    .pipe(gulp.dest('./static/'));

  gulp.src('./static/termsofuse_de.html')
    .pipe(removeCode({staging: true}))
    .pipe(gulp.dest('./static/'));

  gulp.src('./static/termsofuse_fr.html')
    .pipe(removeCode({staging: true}))
    .pipe(gulp.dest('./static/'));

  gulp.src('./static/termsofuse_it.html')
    .pipe(removeCode({staging: true}))
    .pipe(gulp.dest('./static/'));
});

// Inject secret keys

const replaceResources = ['./src/providers/core/utils/resources.ts', './src/index.html',
  './static/de/index.html', './static/fr/index.html', './static/it/index.html',
  './static/index_de.html', './static/index_fr.html', './static/index_it.html',
  './static/termsofuse_de.html', './static/termsofuse_fr.html', './static/termsofuse_it.html', './static/termsofuse.html'
];

gulp.task('resources', function () {
  const resources = JSON.parse(fs.readFileSync('/Users/daviddalbusco/Documents/projects/ororomunroe/resources/resources.json'));

  replace({
    regex: "{{FACEBOOK_APP_ID}}",
    replacement: resources.FACEBOOK.APP_ID,
    paths: replaceResources,
    recursive: false,
    silent: false
  });

  replace({
    regex: "{{FACEBOOK_PIXEL}}",
    replacement: resources.FACEBOOK.PIXEL,
    paths: replaceResources,
    recursive: false,
    silent: false
  });

  replace({
    regex: "{{GOOGLE_ANALYTICS_TRACKER_ID}}",
    replacement: resources.GOOGLE.ANALYTICS.TRACKER_ID,
    paths: replaceResources,
    recursive: false,
    silent: false
  });

  replace({
    regex: "{{GOOGLE_ANALYTICS_SEND_TO}}",
    replacement: resources.GOOGLE.ANALYTICS.SEND_TO,
    paths: replaceResources,
    recursive: false,
    silent: false
  });

  replace({
    regex: "{{GOOGLE_ADWORDS_ID}}",
    replacement: resources.GOOGLE.ADWORDS.ID,
    paths: replaceResources,
    recursive: false,
    silent: false
  });

  replace({
    regex: "{{GOOGLE_LOGIN_WEB_CLIENT_ID}}",
    replacement: resources.GOOGLE.LOGIN.WEB_CLIENT_ID,
    paths: replaceResources,
    recursive: false,
    silent: false
  });

  replace({
    regex: "{{GOOGLE_MAP_API_KEY}}",
    replacement: resources.GOOGLE.MAP.API_KEY,
    paths: replaceResources,
    recursive: false,
    silent: false
  });

});
