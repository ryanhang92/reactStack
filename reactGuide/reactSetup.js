 #Create basic web server environment
 
 1) Follow basic setup here, routes will be more advanced later
   https://github.com/reactjs/react-tutorial/blob/master/server.js
 2) Make sure to have a package.json to install the dependencies
 3) Point the server to a html file:
   app.use('/', express.static(path.join(__dirname, 'public')));
 
 #Loading React and Dependencies
 
 1) In the right html file make sure to link to the react library cdn 
   <head>
     <meta charset="utf-8" />
     <title>React Tutorial</title>
     <script src="https://unpkg.com/react@15.3.1/dist/react.js"></script>
     <script src="https://unpkg.com/react-dom@15.3.1/dist/react-dom.js"></script>
     <script src="https://unpkg.com/babel-core@5.8.38/browser.min.js"></script>
     <script src="https://unpkg.com/jquery@3.1.0/dist/jquery.min.js"></script>
     <script src="https://unpkg.com/remarkable@1.6.2/dist/remarkable.min.js"></script>
   </head>
 
 2) In the body of the html file you are importing a js file,
 this will import react code
 
   <body>
     <div id="content"></div>
     <script type="text/babel" src="scripts/example.js"></script>
     <script type="text/babel">
       // To get started with this tutorial running your own code, simply remove
       // the script tag loading scripts/example.js and start writing code here.
     </script>
   </body>

	*Now start writing react code in scripts/example.js!!
 
 
 3) <WebPack and Other Automation Helpers ???>

