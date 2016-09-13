#How to load React and or Redux into your application

[1] Create basic web server environment
   a) Follow basic setup here, routes will be more advanced later
     https://github.com/reactjs/react-tutorial/blob/master/server.js
   b) Make sure to have a package.json to install the dependencies
   c) Point the server to a html file:
     app.use('/', express.static(path.join(__dirname, 'public')));
 
[2] Load React into your HTML file

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

    c) Potential Issues is How to get JSX to be read, need babel
    How to load babel into the servers

  c) Time to start writing you react code now!
 
#######Loading Redux and other services and Dependencies with Webpack############

[1] Webpack Setup
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

	3) webpack
	4) In your target html file, reference bundle JS is your source
		It compiles all of the dependencies to bundle.js

	5) Run and develop
		npm install webpack-dev-server -g	
		webpack-dev-server --progress --colors	
		*visit localhost:8080/webpack-dev-server/bundle to see your results


[2] Gulp Setup / Nodemon?
	1) create a gulpfile.js <- Review kloudless one for formatting

	2) gulp, runs the scritps

	3) Do nodemon, instead of node to reload server after changes


