const gulp     = require('gulp')
const gulpIf   = require('gulp-if')
const prefixer = require('gulp-autoprefixer')
const sass     = require('gulp-sass')
const notify   = require("gulp-notify")
const plumber  = require('gulp-plumber')
const connect  = require('gulp-connect')

module.exports = function (args, src, dist) {

    /**
     * Compila os arquivos SASS
     */
    gulp.task('styles', () => {
        return gulp.src(src + 'scss/*.scss')
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(gulpIf(args.production,
            sass({ outputStyle: 'compressed' }), sass()
        ))
        .pipe(prefixer({
            versions: ['last 3 browsers']
        }))
        .pipe(notify({
            title: "Styles Merged!",
            message: "Generate file: <%= file.relative %>!"
        }))
        .pipe(gulp.dest(dist + 'assets/css/'))
        .pipe(connect.reload())
    })

    /**
     * SASS Watch
     */
    gulp.task('watchStyles', () => {
        return gulp.watch(src + 'scss/**/*.scss', ['styles'])
        .on('change', (event) => {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
        })
    })
}
