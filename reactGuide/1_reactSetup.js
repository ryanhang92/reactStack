#How to load React and or Redux into your application

[1] Create basic web server environment
   a) Follow basic setup here, routes will be more advanced later
     https://github.com/reactjs/react-tutorial/blob/master/server.js
   b) Make sure to have a package.json to install the dependencies
   c) Point the server to a html file:
     app.use('/', express.static(path.join(__dirname, 'public')));
 
[2] Load React/JS File into your HTML file

<facebook example>
 a) In the target html file make sure to link to the react library cdn, or import it locally
   <head>
     <meta charset="utf-8" />
     <title>React Tutorial</title>
     <script src="https://unpkg.com/react@15.3.1/dist/react.js"></script>
     <script src="https://unpkg.com/react-dom@15.3.1/dist/react-dom.js"></script>
     <script src="https://unpkg.com/babel-core@5.8.38/browser.min.js"></script>
     <script src="https://unpkg.com/jquery@3.1.0/dist/jquery.min.js"></script>
     <script src="https://unpkg.com/remarkable@1.6.2/dist/remarkable.min.js"></script>
   </head>

 b) In your target html file import your react code into a target html object
   <body>
     <div id="content"></div>
     <script type="text/babel" src="scripts/example.js"></script>
     <script type="text/babel">
       // To get started with this tutorial running your own code, simply remove
       // the script tag loading scripts/example.js and start writing code here.
     </script>
     </body>

<Mcginnis Example>
	<!DOCTYPE html>
	<html lang="en">
	<head>
	  <meta charset="UTF-8">
	  <title>My App</title>
	  <link rel="stylesheet" href="styles.css">
	</head>
	<body>
	  <div id="app"></div>
	  <script src="index_bundle.js"></script>
	</html>

[3] Browser loading issue. The browser can only read vanilla javascript, html, css, if you write in JSX or es6 you 
    need to find some way to transpile this into regular JS, we can use bable to do this 
    a) We can use Webpack to automate transpiling into our target JS file
    b) We can use Gulp to automate transpiling into our target JS file 

*Only after this step can we start writing the JS files
 
<Using Webpack to turn react -> Javascript>

<Basic Example>
1) npm install webpack -g
	a) Add the necessary components and npm install into your package.json
2) create a webpack config file
	ex)
	module.exports = {
			entry: "./entry.js", <- Name of the JS file that compiles into bundle.js
			output: {
					path: __dirname,
					filename: "bundle.js" <- Name of file hat is imported into your html
			},
			module: {
					loaders: [
							{ test: /\.css$/, loader: "style!css" }
					]
			}
	};
	ex)
	module.exports = {
	entry: './rpgGame/gameReact.js',
	output: {
		path: __dirname,
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{ 
				test: /\.css$/,
				loader: "style-loader!css-loader"
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: { presets: [ 'es2015', 'react' ] }
			}
		]
	}
};

3) webpack *In your target html file, reference bundle JS is your source
	It compiles all of the dependencies to bundle.js

4) Run and develop
	npm install webpack-dev-server -g	
	webpack-dev-server --progress --colors	
	*visit localhost:8080/webpack-dev-server/bundle to see your results

<Production Example> 

*Standard Application Structure
	/app
	  - components
	  - containers
	  - config
	  - utils
	  index.js
	  index.html
	/dist
	  index.html
	  index_bundle.js
	package.json
	webpack.config.js
	.gitignore

1) install webpack and add needed components 
2) Create a webpack config file and .babelrc?

(webpack config) <- npm install--dave-dev html-webpack-plugin
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',  <- our regular html file
  filename: 'index.html', <-inject the script of the ouput file into here *automatically adds in html of the dist folder)
  inject: 'body'
});
module.exports = {
  entry: [
    './app/index.js' <-the entry js code will be here 
  ],
  output: {
    path: __dirname + '/dist',
    filename: "index_bundle.js"  <-this is there the output js code will be 
  },
  module: {
    loaders: [
      {test: /\.js$/, include: __dirname + '/app', loader: "babel-loader"} <- add the conversion loaders apply to files in app
    ]
  },
  plugins: [HTMLWebpackPluginConfig]
};

npm install — save-dev babel-core babel-loader babel-preset-react
(babelrc) <-- Make the webpack transform
{
  "presets": [
    "react"
  ]
}


3) webpack executes the script


<Advanced Production Webpack Example>




<Using Gulp to turn React -> Javascript>
1) Install the dependencies
	npm init
	npm install --save-dev gulp;
	npm install --save-dev gulp-concat;
	npm install --save-dev gulp-uglify;
	npm install --save-dev gulp-react;
	npm install --save-dev gulp-html-replace

2) 
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var path = { <-- Decalre Paths for tasks 
  HTML: 'src/index.html',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  DEST: 'dist',
  DEST_BUILD: 'dist/build',
  DEST_SRC: 'dist/src',
  ENTRY_POINT: './src/js/App.js'
};

(transform excluded in browserify version)
gulp.task('transform', function(){ <-- This converts jsx into regular js in the DEST folder
  gulp.src(path.JS)
    .pipe(react())
    .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('copy', function(){ <--- Copy built files to production location
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});

gulp.task('watch', function() { <-- Watch for changes in html or js files and update code in dist
  gulp.watch(path.HTML, ['copy']);
var watcher  = watchify(browserify({ <-- Dont update everything saves time
    entries: [path.ENTRY_POINT],
    transform: [reactify], <-- Transforms into regular js
    debug: true, <-- references correct map for line of code
    cache: {}, packageCache: {}, fullPaths: true <-- required for watchify
  }));
return watcher.on('update', function () {
    watcher.bundle()
      .pipe(source(path.OUT)) <--watch for update to these components
      .pipe(gulp.dest(path.DEST_SRC))
      console.log('Updated');
  })
    .bundle()
    .pipe(source(path.OUT))  <-- Bundle all components togeather and pipe to src
    .pipe(gulp.dest(path.DEST_SRC));
});
gulp.task('build', function(){  <- Concatnate, minify then ouput to build build location
  browserify({ 
    entries: [path.ENTRY_POINT], <--This does watch, but without the constant updates, min and send to prod folder
    transform: [reactify],
  })
    .bundle()
    .pipe(source(path.MINIFIED_OUT))
    .pipe(streamify(uglify(path.MINIFIED_OUT)))
    .pipe(gulp.dest(path.DEST_BUILD));
});
gulp.task('replaceHTML', function(){  <-- Replaces build html to take in build js file, reaplce content
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js': 'build/' + path.MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});
gulp.task('production', ['replaceHTML', 'build']); <-- saying "gulp produciton" runs these these tasks
gulp.task('default', ['watch']); <-- Watch is initalized anytime gulp is called

3)

