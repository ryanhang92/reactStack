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


3) <WebPack and Other Automation Helpers ???>


#Creating Components - Start modifying the imported script in scripts/example.js

1) Component Declaration Pattern #1

import { PropTypes, Componet } from 'react'

class LeaderEntry extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {name, points} = this.props
    return (
      <div className="leaderEntry">
        <div className="leaderName">
          {name}
        </div>
        <div className="leaderPoints">
          {points}
        </div>
      </div>
    )
  }
};

LeaderEntry.propTypes = {
  name: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired
};

2) Component Declaration Pattern #2

var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        Hello, world! I am a CommentBox.
      </div>
    );
  }
});


***<For BOTH Patterns the components needs to be rendered with this element>
This hooks onto a div id element

ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
);

a) This could either be one master component on an single page
b) Or there could be multiple versions of these contected to various elems


*Providing components with an inital state




#Connecting Components Togeather 

1) Rendering Components within other Components and passing information
	from parent to child

a) Most Basic Pattern

# Loading the parent component with data 
var CommentList = React.createClass({
  render: function() {
    return (
      <div className="commentList">
        <Comment author="Pete Hunt">This is one comment</Comment>
        <Comment author="Jordan Walke">This is *another* comment</Comment>
      </div>
    );
  }
});

# Passing the data onto the children
var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
    );
  }
});

2) Passing information from Child to Parent




#Dynamic Updating Patterns 










#Advanced patterns such as nesting











