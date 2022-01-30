import gulp from 'gulp'
import { paths } from './gulp/paths.js'
import { plugins } from './gulp/plugins.js'

global.app = {
    paths,
    gulp,
    plugins,
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
}

import { copy } from './gulp/tasks/copy.js'
import { clean } from './gulp/tasks/clean.js'
import { pug } from './gulp/tasks/pug.js'
import { server } from './gulp/tasks/server.js'
import { scss } from './gulp/tasks/scss.js'
import { js } from './gulp/tasks/js.js'
import { images } from './gulp/tasks/images.js'

const watcher = () => {
    gulp.watch(paths.watch.pug, pug);
    gulp.watch(paths.watch.scss, scss);
    gulp.watch(paths.watch.js, js);
    gulp.watch(paths.watch.images, images);
    gulp.watch(paths.watch.fonts, copy);
}

const mainTasks = gulp.parallel(
    copy, 
    pug, 
    scss,
    js,
    images,
)

export const dev = gulp.series(
    clean, 
    mainTasks, 
    gulp.parallel(watcher, server)
)

export const build = gulp.series(
    clean,
    mainTasks
)

gulp.task('default', dev)