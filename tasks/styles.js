const gulp     = require('gulp')
const gulpIf   = require('gulp-if')
const prefixer = require('gulp-autoprefixer')
const sass     = require('gulp-sass')
const notify   = require("gulp-notify")
const plumber  = require('gulp-plumber')
const connect  = require('gulp-connect')
const merge    = require('merge-stream')
var concat     = require('gulp-concat')

module.exports = function (args, src, dist) {

    /**
     * Compila os arquivos SASS
     */
    gulp.task('styles', () => {

        let sassStream = gulp.src(src + 'scss/*.scss')
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

        let cssStream = gulp.src([])

        return merge(sassStream, cssStream)
            .pipe(concat('main.css'))
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
