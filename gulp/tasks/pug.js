import versionNumber from 'gulp-version-number'
import gulpPug from 'gulp-pug'

export const pug = () => {
    return app.gulp.src(app.paths.src.pug)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'Pug',
                message: 'Error: <%= error.message %>'
            })
        ))
        .pipe(gulpPug({
            pretty: true,
            verbose: true,
        }))
        .pipe(app.plugins.replace(/@img\//g, './img/'))
        .pipe(app.plugins.if(
            app.isBuild,
            versionNumber({
            'value': '%DT%',
            'append': {
                'key': '_v',
                'cover': 0,
                'to': [
                    'css',
                    'js',
                ]
            },
            'output': {
                'file': 'gulp/version.json'
            }
            }))
        )
        .pipe(app.gulp.dest(app.paths.build.html))
        .pipe(app.plugins.browserSync.stream())
}