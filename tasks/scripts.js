const gulp       = require('gulp')
const gulpIf     = require('gulp-if')
const browserify = require('browserify')
const babelify   = require('babelify')
const uglify     = require('gulp-uglify')
const source     = require('vinyl-source-stream')
const buffer     = require('vinyl-buffer')
const notify     = require("gulp-notify")
const plumber    = require('gulp-plumber')
const connect    = require('gulp-connect')

module.exports = function (args, src, dist) {

    /**
     * Concatena e minifica arquivos JS
     */
    gulp.task('scripts', () => {
        return browserify(src + 'js/main.js')
        .transform(babelify).bundle()
        .pipe(source('main.js'))
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(gulpIf(args.production, buffer()))
        .pipe(gulpIf(args.production, uglify()))
        .pipe(notify({
            title: "Scripts Merged!",
            message: "Generate file: <%= file.relative %>!"
        }))
        .pipe(gulp.dest(dist + 'assets/js/'))
        .pipe(connect.reload())
    })

    /**
     * Scripts Watch
     */
    gulp.task('watchScripts', () => {
        return gulp.watch(src + 'js/**/*.js', ['scripts'])
        .on('change', (event) => {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
        })
    })
}
