/**
 * Diretórios
 */
const src   = './src/'
const dist  = './dist/'
const tasks = './tasks/'

/**
 * Dependências
 */
const gulp    = require('gulp')
const clean   = require('gulp-clean')
const connect = require('gulp-connect')
const run     = require('run-sequence')
const glob    = require("glob")

gulp.task('connect', () => {
    connect.server({
        root: './dist/',
        livereload: true
    })
})

/**
 * Compila arquivos para produção com a flag --production
 */
const args = require('yargs').default('production', false).argv

/**
 * Carrega os módulos
 */
glob.sync('./tasks/*.js', {}).forEach( (file) => {
    require(file)(args, src, dist)
})

/**
 * Limpa diretórios de produção
 */
gulp.task('clean', () => gulp.src(dist).pipe(clean()))

/**
 * Copia fontes e imagens
 */
gulp.task('copy', (callback) => run('fonts', 'images', callback))

/**
 * Roda todas as tasks principais
 */
gulp.task('default', (callback) => run('clean', ['copy', 'pug', 'styles', 'scripts'], callback))

/**
 * Watch tasks
 */
gulp.task('watch', (callback) => run('copy', 'watchPug', 'watchStyles', 'watchScripts', 'connect', callback))
