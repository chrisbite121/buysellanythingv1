module.exports = function() {
    var client = './src/client/';
    var clientApp = client + 'app/';
    var root = './';
    var temp = './.tmp/';
    var server =  './src/server/';

    var config = {
        /**
         * Files paths
         */
        alljs: [
            './src/**/*.js',
        ],
        build: './build/',
        client: client,
        css: temp + 'styles.css',
        fonts: './bower_components/font-awesome/fonts/**/*.*',
        htmltemplates: clientApp + '**/*.html',
        images: [
            client + 'images/**/*',
            '!' + client + 'images/core/**/*.*'
        ],
        imagesCore: client + 'images/core/**/*.*',
        index: client + 'index.html',
        js: [
            clientApp + '**/*.module.js',
            clientApp + '**/*.js',
            clientApp + '**/*.spec.js',
            '!' + clientApp + '**/*.spec.js'
        ],
        less: client + 'styles/styles.less',
        root: root,
        server: server,
        temp: temp,
        /*
         * template cache
         */
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'app.core',
                standAlone: false,
                root: 'app/'
            }
        },
        /*
         * browser sync
         */
        browserReloadDelay: 1000,
        /*
         * Bower and NPM locations
         */
        bower: {
            json: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: '../..'
        },
        packages: [
            './package.json',
            './bower.json'
        ],
         /*
          * Node Settings 
          */
        defaultPort: 3000,
        nodeServer: server + 'app.js'
    };

    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };

        return options;
    
    };

    return config;
};