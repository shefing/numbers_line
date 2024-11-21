const gulp = require('gulp');
const obfuscate = require('gulp-javascript-obfuscator');


function obfuscateJS(lang) {
  return gulp.src([`${lang}/intrl/edgy.trivia.js`, `${lang}/intrl/index_edge.js`, `${lang}/intrl/index_edgePreload.js`, `${lang}/intrl/index_edgeActions.js`])
    .pipe(obfuscate())
    .pipe(gulp.dest(`dist/${lang}`));
}


gulp.task('obfuscate', function () {
  return new Promise(resolve => {
    obfuscateJS('he');
    resolve();
  });
});