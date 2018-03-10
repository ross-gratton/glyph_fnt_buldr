/*//////////////////////////////////////////////////////////////////////////////
|| Setup
//////////////////////////////////////////////////////////////////////////////*/

    /*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    || Load Config
    >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
    var config = require('./config.json');
    
    /*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    || Include Node Files
    >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
    var gulp = require('gulp'),
        fs = require('fs'),
        del = require('del');

    /*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    || Include Plugins
    >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
    var sass = require('gulp-ruby-sass'),
        rename = require('gulp-rename'),
        cssnano = require('gulp-cssnano'),
        sourcemaps = require('gulp-sourcemaps'),
        iconfont = require('gulp-iconfont'),
        iconfontCss = require('gulp-iconfont-css'),
        minify = require('gulp-minify');


/*//////////////////////////////////////////////////////////////////////////////
|| Fonts
//////////////////////////////////////////////////////////////////////////////*/

    /*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    || Icon Font
    >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
    gulp.task('build', function(){

        var font_filename = "_icons--" + config.font_name + ".scss";
        var source = config.env.source.base + config.env.source.icons + config.font_name + "/*.svg";
        var dest = config.env.build.base + config.env.build.fonts + config.font_name + "/";
        var template_path = config.env.source.base + config.env.source.sass;

        console.log("SOURCE:", source);
        console.log("DESTINATION:", dest);

        return gulp.src([source])
            .pipe(iconfontCss({
                fontName: config.font_name,
                path: template_path + '_icons-template.scss',
                targetPath: font_filename,
                fontPath: dest
            }))
            .pipe(iconfont({
                fontName: config.font_name,
                appendCodepoints: true,
                normalize: true
            }))
            .on('codepoints', function(codepoints, options){
                console.log(codepoints, options);
            })
            .pipe(gulp.dest(dest));
    });    


/*//////////////////////////////////////////////////////////////////////////////
|| Watches
//////////////////////////////////////////////////////////////////////////////*/
gulp.task('watch', function(){
    
    var project_icon_watch = config.env.source.base + config.env.source.icons + config.font_name + "/*.svg";
    gulp.watch(project_icon_watch, { debounceDelay: 2000 }, ['fonts--icon']);
});


/*//////////////////////////////////////////////////////////////////////////////
|| Default task wrapper
//////////////////////////////////////////////////////////////////////////////*/
gulp.task('default', ['watch']);
