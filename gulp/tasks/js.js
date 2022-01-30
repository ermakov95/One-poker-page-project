import webpack from 'webpack-stream'
import babel from 'gulp-babel'
import named from 'vinyl-named'
import rename from 'gulp-rename'

export const js = () => {
    return app.gulp.src(app.paths.src.js, { sourcemaps: app.isDev })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'JS',
                message: 'Error: <%= error.message %>'
            })
        ))
        .pipe(babel())
        .pipe(named())
        .pipe(webpack({
            mode: app.isBuild ? 'production' : 'development',
        }))
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(app.gulp.dest(app.paths.build.js))
        .pipe(app.plugins.browserSync.stream())
}