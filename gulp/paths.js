import * as path from 'path'

const rootPath = path.basename(path.resolve())
const buildPath = './build'
const srcPath = './src'

export const paths = {
    rootPath,
    buildPath,
    srcPath,
    clean: buildPath,
    build: {
        html: `${buildPath}/`,
        css: `${buildPath}/css/`,
        js: `${buildPath}/js/`,
        images: `${buildPath}/img/`,
        fonts: `${buildPath}/fonts/`,
    },
    src: {
        pug: `${srcPath}/pages/*.pug`,
        scss: `${srcPath}/scss/*.scss`,
        js: `${srcPath}/js/*.js`,
        images: `${srcPath}/img/**/*.{jpg,jpeg,png,gif,webp}`,
        svg: `${srcPath}/img/**/*.svg`,
        fonts: `${srcPath}/fonts/**/*.*`,
    },
    watch: {
        pug: `${srcPath}/pages/**/*.pug`,
        scss: `${srcPath}/scss/**/*.scss`,
        js: `${srcPath}/js/**/*.js`,
        images: `${srcPath}/img/**/*.{jpg,jpeg,png,gif,webp,ico,svg}`,
        fonts: `${srcPath}/fonts/**/*.*`,
    },
}