const gulp    = require('gulp')
const gulpIf  = require('gulp-if')
const pug     = require('gulp-pug')
const notify  = require("gulp-notify")
const plumber = require('gulp-plumber')
const connect = require('gulp-connect')

module.exports = function (args, src, dist) {

    /**
     * Compila os arquivos Pug/Jade
     */
    gulp.task('pug', () => {
        return gulp.src('./src/pug/*.pug')
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(gulpIf(args.production, pug(), pug({ pretty: true })))
        .pipe(notify({
            title: "Pug/Jade Merged!",
            message: "Generate file: <%= file.relative %>!"
        }))
        .pipe(gulp.dest('./dist/'))
        .pipe(connect.reload())
    })

    /**
     * Pug/Jade Watch
     */
    gulp.task('watchPug', () => {
        return gulp.watch('./src/pug/**/*.pug', ['pug'])
        .on('change', (event) => {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
        })
    })
}
