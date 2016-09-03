var gulp     = require('gulp')
var gulpIf   = require('gulp-if')
var imageMin = require('gulp-imagemin')

module.exports = (args, src, dist) => {

    /**
     * Copia/minifica imagens
     */
    gulp.task('images', () => {
        return gulp.src(src + 'img/*')
        .pipe(gulpIf(args.production, imageMin()))
        .pipe(gulp.dest(dist + 'assets/img'))
    })

    /**
     * Copia fontes
     */
    gulp.task('fonts', () => {
        return gulp.src(src + 'fonts/*')
        .pipe(gulp.dest(dist + 'assets/fonts'))
    })
}
