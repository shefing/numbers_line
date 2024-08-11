const gulp = require('gulp');
const obfuscate = require('gulp-javascript-obfuscator');


function obfuscateJS(lang) {
  return gulp.src([`example/${lang}/intrl/index_edge.js`, `example/${lang}/intrl/index_edgeActions.js`, `example/${lang}/intrl/index_edgePreload.js`, `example/${lang}/intrl/edgy.tetris.js`])
    .pipe(obfuscate())
    .pipe(gulp.dest(`dist/${lang}`));
}


gulp.task('obfuscate', function () {
  return new Promise(resolve => {
    obfuscateJS('he');
    obfuscateJS('en');
    resolve();
  });
});
