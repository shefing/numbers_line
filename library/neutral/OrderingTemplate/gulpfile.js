const gulp = require('gulp');
const obfuscate = require('gulp-javascript-obfuscator');


function obfuscateJS() {
  return gulp.src(['intrl/main.js'])
    .pipe(obfuscate())
    .pipe(gulp.dest('dist'));
}

gulp.task('obfuscate', function () {
  // localEnv = '.';
  return new Promise(resolve => {
    obfuscateJS();
    resolve();
  });
});
