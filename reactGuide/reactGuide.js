#Creating Components - Start modifying the imported script in scripts/example.js

[Declaring Components]

<Component Declaration Pattern #1>
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

#Prop Type checking is good
LeaderEntry.propTypes = {
  name: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired
};

<Component Declaration Pattern #2>
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        Hello, world! I am a CommentBox.
      </div>
    );
  }
});


***<For BOTH Patterns the components needs to be rendered an html element, which hooks onto a div=id element>***
ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
);

a) This could either be one master component on an single page
b) Or there could be multiple versions of these connected with various components

[Wiring Components Togeather]

#1 Passing data from parent component to child component

<Basic Example>

1) Load data by setting a variable inside the tag
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

2) Render the passed in data by referencing the prop
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

<Passing in stream of data>

1) Add data to root component
ReactDOM.render(
  <CommentBox data={data} />,
  document.getElementById('content')
);

2) Pass it to the right level
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.props.data} />
        <CommentForm />
      </div>
    );
  }
});

3) Render it with mapping
var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});


#2 Passing data from child component to parent component
























