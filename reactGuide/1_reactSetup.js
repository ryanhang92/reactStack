#How to load React and or Redux into your application

[1] Create basic web server environment
   a) Follow basic setup here, routes will be more advanced later
     https://github.com/reactjs/react-tutorial/blob/master/server.js
   b) Make sure to have a package.json to install the dependencies
   c) Point the server to a html file:
     app.use('/', express.static(path.join(__dirname, 'public')));
 
[2] Load React Dependencies 

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


 b)  In your target html file import your react code into a target html object
   <body>
     <div id="content"></div>
     <script type="text/babel" src="scripts/example.js"></script>
     <script type="text/babel">
       // To get started with this tutorial running your own code, simply remove
       // the script tag loading scripts/example.js and start writing code here.
     </script>
   </body>

  c) Time to start writing you react code now!
 
#Loading Redux and other services and Dependencies with Webpack

[1] Webpack Setup



[2] Gulp Setup / Nodemon?

