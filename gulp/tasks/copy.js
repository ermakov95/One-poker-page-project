export const copy = () => {
    return app.gulp.src(app.paths.src.fonts)
        .pipe(app.gulp.dest(app.paths.build.fonts))
}