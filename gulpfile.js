var gulp = require('gulp');
var config = require('./gulp.config')();
var args = require('yargs').argv;
var del = require('del');
var wiredep = require('wiredep').stream;
var port = process.env.PORT || config.defaultPort;
var browserSync = require('browser-sync');

var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var util = require('gulp-util');
var gulpprint = require('gulp-print');
var gulpif = require('gulp-if');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var inject = require('gulp-inject');
var nodemon = require('gulp-nodemon');
var tasklisting = require('gulp-task-listing');
var imagemin = require('gulp-imagemin');
var angularTemplatecache = require('gulp-angular-templatecache');
var minifyHtml = require('gulp-minify-html');
var useref = require('gulp-useref');
var filter = require('gulp-filter');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var bump = require('gulp-bump');

gulp.task('default', ['help']);
gulp.task('help', tasklisting);

gulp.task('vet', function(){
    log('Analysing source with JSHint and JSCS');
    return gulp
        .src(config.alljs)
        .pipe(gulpif(args.verbose, gulpprint()))
        .pipe(jscs())
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe(jshint.reporter('fail'));
});

gulp.task('styles',['clean-styles'], function() {
    log('Compiling less ---> CSS');

    return gulp
        .src(config.less)
        .pipe(plumber())
        .pipe(less())
        .pipe(autoprefixer({browsers: ['last 2 version', '> 5%']}))
        .pipe(gulp.dest(config.temp));
    });

gulp.task('clean', function(){
    var delconfig = [].concat(config.build, config.temp);
    log('Cleaning: ' + util.colors.green(delconfig));
    del(delconfig);

});

gulp.task('clean-styles', function() {
    var files = config.temp + '**/*.css';
    clean(files);
    });

gulp.task('clean-fonts', function() {
    var files = config.build + 'fonts/**/*.*';
    clean(files);
    });


gulp.task('clean-images', function() {
    log('Cleaning Images');
    var files = config.build + 'images/**/*.*';
    clean(files);
    });

gulp.task('clean-code', function() {
    var files = [].concat(
        config.temp + '**/*',
        config.build + '**/*'
    );
    clean(files);
    });

gulp.task('less-watcher', function() {
    gulp.watch([config.less], ['styles']);
    });

gulp.task('templatecache', ['clean-code'], function() {
    log('creating AngularJS $templateCache');

    return gulp
        .src(config.htmltemplates)
        .pipe(minifyHtml({empty: true}))
        .pipe(angularTemplatecache(
            config.templateCache.file,
            config.templateCache.options
            ))
        .pipe(gulp.dest(config.temp));
});

gulp.task('wiredep', function() {
    log('Wire up the bower css js and our app js into the html');
    var options = config.getWiredepDefaultOptions();

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe(inject(gulp.src(config.js)))
        .pipe(gulp.dest(config.client));
    });

gulp.task('inject', ['wiredep', 'styles', 'templatecache'], function() {
    log('Wire up app css into the html, and call wiredep');    

    return gulp
        .src(config.index)
        .pipe(inject(gulp.src(config.css)))
        .pipe(gulp.dest(config.client));
    });    

gulp.task('optimise', ['inject', 'fonts', 'images', 'images-transfer'], function() {
    log('Optimiszing javascript, css, html');

    var assets = useref.assets({ searchPath: './'});
    var templateCache = config.temp + config.templateCache.file;
    var cssFilter = filter(['**/*.css'], {restore: true});
    var jsFilter = filter(['**/*.js'],{restore: true});

    return gulp
        .src(config.index)
        .pipe(plumber())
        .pipe(inject(gulp.src(templateCache, {read: false}), {
            starttag: '<!-- inject:templates:js -->'
        }))
        .pipe(assets)
        // filer down to css
        .pipe(cssFilter)
        // csso
        .pipe(csso())
        // filter restore
        .pipe(cssFilter.restore)
        .pipe(jsFilter)
        // uglify
        .pipe(uglify())
        // filter restore
        .pipe(jsFilter.restore)
        .pipe(rev())        
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(revReplace())
        .pipe(gulp.dest(config.build))
        .pipe(rev.manifest())
        .pipe(gulp.dest(config.build));

});
/**
 * Bump the version
 * --type=pre will bump the prerelease version *.*.*-x
 * --type=patch or no flag will bump the patch version *.*.x
 * --type=minor will bump the minor version *.x.*
 * --type=major will bump the major version x.*.*
 * --version=1.2.3 will bump to a specific version and ignore other flags
 */

gulp.task('bump', function() {
    var msg = 'Bumping versions';
    var type = args.type;
    var version = args.version;
    var options = {};
    if (version) {
        options.version = version;
        msg += ' to ' + version;
    } else {
        options.type = type;
        msg += ' for a ' + type;
    }
    log(msg);
    return gulp
        .src(config.packages)
        .pipe(gulpprint())
        .pipe(bump(options))
        .pipe(gulp.dest(config.root));
});

gulp.task('serve-dev', ['optimise'], function() {
    var isDev = true;
    var nodeOptions = {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE_ENV': isDev ? 'dev' : 'build'
        },
        watch: [config.server]
    };

    return nodemon(nodeOptions)
        .on('restart', ['vet'], function(ev) {
            log('*** nodemon restarted');
            log('files changed on restart: \n' + ev);
        })
        .on('start', function() {
            log('*** nodemon started');
            startBrowserSync();
        })
        .on('crash', function() {
            log('*** nodemon crashed: script crashed for some reason');
        })
        .on('exit', function() {
            log('*** nodemon exited cleanly');
        });
});

gulp.task('fonts', ['clean-fonts'], function() {
    log('Copying fonts');

    return gulp
        .src(config.fonts)
        .pipe(gulp.dest(config.build + 'fonts'));
});

gulp.task('images-transfer', ['clean-images'], function() {
    //transfer non-core images (images generated by end-users)
    return gulp
        .src(config.images)
        .pipe(gulp.dest(config.build + 'images'));
});

gulp.task('images', ['images-transfer'], function() {
    //tranfer and compress core images (images used in application)
    log('Copying and compressing images');

    return gulp
        .src(config.imagesCore)
        .pipe(imagemin({optimizationLevel: 4}))
        .pipe(gulp.dest(config.build + 'images/core'));
});

//////////////////////////////////////////////////////
function changeEvent(event) {
    var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

function startBrowserSync() {
    if(args.nosync || browserSync.active) {
        log('browserSync not starting');
        return;
    }

    log('Starting browser-sync on port ' + port);

        gulp.watch([config.less], ['styles'])
            .on('change', function(event){
                changeEvent(event);
            });


    var options = {
        proxy: 'localhost:' + port,
        port: 4000,
        files: [
            config.client + '**/*.*',
            '!' + config.less,
            config.temp + '**/*.css'
            ],
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll:true,
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: config.browserReloadDelay
    };

    browserSync.init(options);
}


function clean(path) {
    log('Cleaning: ' + util.colors.green(path))
    del(path);
}

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                util.log(util.colors.green(msg[item]));
            }
        }
    } else {
        util.log(util.colors.green(msg));
    }
}