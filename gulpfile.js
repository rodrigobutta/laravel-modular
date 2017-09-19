// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    print = require('gulp-print'),
    server = lr();




    var paths = {
        build: './public/build',
        styles: {
            sources: './resources/assets/sass/*.scss',
            compiled: './public/css',
        },
        scripts: {
            sources: './resources/assets/js/*.js',
            compiled: './public/js',
        },
        startup: {
            scripts: {
                sources: [
                    './resources/assets/js/startup/*.js',
                ],
                compiled: './public/js',
            },
            styles: {
                sources: [
                    './resources/assets/sass/startup/*.scss',
                    './resources/assets/sass/startup/*.css',
                ],
                compiled: './public/css',
            },
        },
        admin: {
            scripts: {
                sources: [
                    './resources/assets/js/admin/*.js',
                ],
                compiled: './public/admin/js',
            },
            styles: {
                sources: [
                    './resources/assets/sass/admin/*.scss',
                    './resources/assets/sass/admin/*.css',
                ],
                compiled: './public/admin/css',
            },
        },
        vendor: {
            styles: {
                sources: [
                    './resources/assets/sass/vendor/*.scss',
                    './resources/assets/sass/vendor/*.css',
                ],
                compiled: './public/css',
            },
            scripts: {
                sources: [
                    './resources/assets/vendor/jquery/dist/jquery.js',
                    './resources/assets/vendor/jquery-form/*.js',
                    './resources/assets/vendor/owl.carousel/dist/owl.carousel.js',
                    './resources/assets/vendor/waypoints/lib/jquery.waypoints.js',
                    './resources/assets/vendor/jquery-hoverintent/jquery.hoverIntent.js',
                    './resources/assets/vendor/fastclick/lib/fastclick.js',
                    './resources/assets/vendor/superfish/dist/js/superfish.js',
                    './resources/assets/js/vendor/**/*.js',
                ],
                compiled: './public/js',
            },
        },
        tmp: './public/css/borrame'
    };


// Styles

    // App
    gulp.task('styles', function() {
      return gulp.src(paths.styles.sources)
        .pipe(sourcemaps.init())
        .pipe(sass({ style: 'expanded', }))
        .pipe(concat('app.css'))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(paths.styles.compiled))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(livereload(server))
        .pipe(gulp.dest(paths.build))
        .pipe(print(function(filepath) { return "style built: " + filepath; }));
        // .pipe(notify({ message: 'Styles task complete' }));
    });


    // Vendor
    gulp.task('styles_vendor', function() {
      return gulp.src(paths.vendor.styles.sources)
        .pipe(sourcemaps.init())
        .pipe(sass({ style: 'expanded', }))
        .pipe(concat('vendor.css'))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(paths.vendor.styles.compiled))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(livereload(server))
        .pipe(gulp.dest(paths.build))
        .pipe(print(function(filepath) { return "vendor style built: " + filepath; }));
        // .pipe(notify({ message: 'Styles task complete' }));
    });

    // Startup
    gulp.task('styles_startup', function() {
      return gulp.src(paths.startup.styles.sources)
        .pipe(sourcemaps.init())
        .pipe(sass({ style: 'expanded', }))
        .pipe(concat('startup.css'))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(paths.startup.styles.compiled))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(livereload(server))
        .pipe(gulp.dest(paths.build))
        .pipe(print(function(filepath) { return "startup style built: " + filepath; }));
        // .pipe(notify({ message: 'Styles task complete' }));
    });



    // Admin
    gulp.task('styles_admin', function() {
      return gulp.src(paths.admin.styles.sources)
        .pipe(sourcemaps.init())
        .pipe(sass({ style: 'expanded', }))
        .pipe(concat('admin.css'))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(paths.admin.styles.compiled))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(livereload(server))
        .pipe(gulp.dest(paths.build))
        .pipe(print(function(filepath) { return "admin style built: " + filepath; }));
        // .pipe(notify({ message: 'Styles task complete' }));
    });



// Scripts

    // App
    gulp.task('scripts', function() {
      return gulp.src(paths.scripts.sources)
        .pipe(sourcemaps.init())
       // .pipe(jshint('.jshintrc'))  // si descomento me muestra los posibles errores de js
        // .pipe(jshint.reporter('default'))
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.scripts.compiled))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(livereload(server))
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.build))
        .pipe(print(function(filepath) { return "script built: " + filepath; }))
        .pipe(notify({ message: 'Scripts task complete' }));
    });

    // Vendor
    gulp.task('scripts_vendor', function() {
      return gulp.src(paths.vendor.scripts.sources)
        .pipe(sourcemaps.init())
       // .pipe(jshint('.jshintrc'))  // si descomento me muestra los posibles errores de js
        // .pipe(jshint.reporter('default'))
        .pipe(concat('vendor.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.vendor.scripts.compiled))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(livereload(server))
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.build))
        .pipe(print(function(filepath) { return "vendor script built: " + filepath; }))
        .pipe(notify({ message: 'Vendor scripts task complete' }));
    });

    // Startup
    gulp.task('scripts_startup', function() {
      return gulp.src(paths.startup.scripts.sources)
        .pipe(sourcemaps.init())
       // .pipe(jshint('.jshintrc'))  // si descomento me muestra los posibles errores de js
        // .pipe(jshint.reporter('default'))
        .pipe(concat('startup.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.startup.scripts.compiled))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(livereload(server))
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.build))
        .pipe(print(function(filepath) { return "startup script built: " + filepath; }))
        .pipe(notify({ message: 'Startup scripts task complete' }));
    });




    // Admin
    gulp.task('scripts_admin', function() {
      return gulp.src(paths.admin.scripts.sources)
        .pipe(sourcemaps.init())
       // .pipe(jshint('.jshintrc'))  // si descomento me muestra los posibles errores de js
        // .pipe(jshint.reporter('default'))
        .pipe(concat('admin.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.admin.scripts.compiled))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(livereload(server))
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.build))
        .pipe(print(function(filepath) { return "admin script built: " + filepath; }))
        .pipe(notify({ message: 'Admin scripts task complete' }));
    });



// Images
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true,
            use: [pngquant()]
        })))
    .pipe(livereload(server))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean', function() {
  return gulp.src([paths.tmp], {read: false})
    .pipe(clean());
});



// Watch
gulp.task('watch', function() {


    // scripts

    gulp.watch([paths.scripts.sources], ['scripts'])
    .on('change', function(event) {
        console.log('Scripts@App file ' + event.path + ' was ' + event.type + '..');
    });

    gulp.watch([paths.vendor.scripts.sources], ['scripts_vendor'])
    .on('change', function(event) {
        console.log('Scripts@Vendor file ' + event.path + ' was ' + event.type + '..');
    });

    gulp.watch([paths.startup.scripts.sources], ['scripts_startup'])
    .on('change', function(event) {
        console.log('Scripts@Startup file ' + event.path + ' was ' + event.type + '..');
    });

    gulp.watch([paths.admin.scripts.sources], ['scripts_admin'])
    .on('change', function(event) {
        console.log('Scripts@Admin file ' + event.path + ' was ' + event.type + '..');
    });


    // styles

    gulp.watch([paths.styles.sources], ['styles'])
    .on('change', function(event) {
        console.log('Styles@App file ' + event.path + ' was ' + event.type + '..');
    });

    gulp.watch([paths.vendor.styles.sources], ['styles_vendor'])
    .on('change', function(event) {
        console.log('Styles@Vendor file ' + event.path + ' was ' + event.type + '..');
    });

    gulp.watch([paths.startup.styles.sources], ['styles_startup'])
    .on('change', function(event) {
        console.log('Styles@Startup file ' + event.path + ' was ' + event.type + '..');
    });

    gulp.watch([paths.admin.styles.sources], ['styles_admin'])
    .on('change', function(event) {
        console.log('Styles@Admin file ' + event.path + ' was ' + event.type + '..');
    });





});



gulp.task('default', ['styles', 'styles_startup', 'styles_vendor', 'styles_admin', 'scripts', 'scripts_startup', 'scripts_vendor', 'scripts_admin', 'watch']);

