var gulp = require('gulp'),
		sass = require('gulp-sass'),
		browserSync = require('browser-sync'),
		concat = require('gulp-concat'),
		uglify = require('gulp-uglifyjs'),
		cssnano = require('gulp-cssnano'),
		rename = require('gulp-rename'),
		del = require('del'),
		imagemin = require('gulp-imagemin'),
		pngquant = require('imagemin-pngquant'),
		cache =require('gulp-cache'),
		autoprefixer = require('gulp-autoprefixer'),
		livereload = require('gulp-livereload');
		
		


gulp.task('sass',function(){
	return gulp.src(['src/sass/susy/*.scss','src/sass/sass/*.sass'])
		.pipe(sass({
          outputStyle: 'compressed',
          includePaths: ['node_modules/susy/sass']
      }).on('error', sass.logError))
		.pipe(autoprefixer(['Last 10 versions', '>1%', 'ie 8'], {cascade:true}))
		.pipe(gulp.dest('src/css'))
		.pipe(browserSync.reload({stream:true}))
});



gulp.task('scripts', function(){
	return gulp.src([
		'src/libs/jquery/dist/jquery.slim.min.js'
	])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('src/js'));
});

gulp.task('css-libs', ["sass"], function(){
	return gulp.src(['src/css/style.css','src/css/compass/grid.css','src/css/susy.css'])
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('src/css'));
});

gulp.task('browser-sync',function(){
	browserSync({
		server : {baseDir : 'src'},
		port: 4560
	});
});

gulp.task('clean', function(){
	return del.sync('dist');
});

gulp.task('img', function(){
	return gulp.src('src/img/**/*')
		.pipe(cache(imagemin({
			interlaced:true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			une:[pngquant()]
		})))
		.pipe(gulp.dest('dist/img'));
});

gulp.task("watch", ['browser-sync', 'sass', 'scripts'], function(){
	gulp.watch(['src/sass/**/*.sass','src/sass/susy/*.scss'], ['sass']);
	gulp.watch('src/sass/compass/*.scss', ['compass']);
	gulp.watch('src/*.html', browserSync.reload);
	gulp.watch('src/js/**/*.js', browserSync.reload);
});

gulp.task('build', ['clean', 'sass','img', 'scripts'], function(){
	
	var buildCss = gulp.src(['src/css/**/*.css'])
		.pipe(gulp.dest('dist/css'));
	var buildFonts = gulp.src('src/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));
	var buildJs = gulp.src('src/js/**/*')
		.pipe(gulp.dest('dist/js'));
	var buildHtml = gulp.src('src/**/*.html')
		.pipe(gulp.dest('dist'));
});