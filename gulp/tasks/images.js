import imagemin from 'gulp-imagemin'

export const images = () => {
    return app.gulp.src(app.paths.src.images)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'IMAGES',
                message: 'Error: <%= error.message %>'
            })
        ))
        .pipe(app.plugins.newer(app.paths.build.images))
        .pipe(app.plugins.if(
            app.isBuild,
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                interlaced: true,
                optimizationLevel: 2
            }))
        )
        .pipe(app.gulp.dest(app.paths.build.images))
        .pipe(app.gulp.src(app.paths.src.svg))
        .pipe(app.gulp.dest(app.paths.build.images))
        .pipe(app.plugins.browserSync.stream())
}