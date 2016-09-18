Start modifying the javascript file that your imported in your target HTML file

********************[Declaring Components]******************************

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

LeaderEntry.propTypes = { (PropType checking is good)
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

#This master react object is generally assocaited with a single HTML object

*******************[Wiring Components Togeather]*************************
(Fundamental Parent to Child data flow)

[1 Passing data from parent component to child component]

<Basic Example>
1) Load data as a prop attribute by setting data within a tag
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

2) Render the passed in data by referencing the prop, this is data value
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

<Stream of Data example>
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

<Advanced example with PropType Checking, getDefaultProps, and 
  AddFriend Setter Method passed down>

1) Declare Parent container tha contains the overarching state with a function
that can be passed down to change the global state

var FriendsContainer = React.createClass({
  getInitialState: function(){
    return {
      name: 'Tyler McGinnis',
      friends: ['Jake Lingwall', 'Murphy Randall', 'Merrick Christensen'],
    }
  },
  addFriend: function(friend){
    this.setState({
      friends: this.state.friends.concat([friend])
    });
  },
  render: function(){
    return (
      <div>
        <h3> Name: {this.state.name} </h3>
        <AddFriend addNew={this.addFriend} />
        <ShowList names={this.state.friends} />
      </div>
    )
  }
});

2) Create a separate form component to used to passed down function to change
the global state 
*Proper checking is used to make sure critical functions exist

var AddFriend = React.createClass({
  getInitialState: function(){
    return {
      newFriend: ''
    }
  },
  propTypes: {
    addNew: React.PropTypes.func.isRequired
  },
  updateNewFriend: function(e){
    this.setState({
      newFriend: e.target.value
    });
  },
  handleAddNew: function(){
    this.props.addNew(this.state.newFriend);
    this.setState({
      newFriend: ''
    });
  },
  render: function(){
    return (
      <div>
        <input type="text" value={this.state.newFriend} onChange={this.updateNewFriend} />
        <button onClick={this.handleAddNew}> Add Friend </button>
      </div>
    );
  }
});

3) Create a list render function to render the global this global state
*default props are used, as a place holder to smooth out the experience

var ShowList = React.createClass({
  getDefaultProps: function(){
    return {
      names: []
    }
  },
  render: function(){
    var listItems = this.props.names.map(function(friend){
      return <li> {friend} </li>;
    });
    return (
      <div>
        <h3> Friends </h3>
        <ul>
          {listItems}
        </ul>
      </div>
    )
  }
});

<Component Life Cycle Methods>

var FriendsContainer = React.createClass({
  getInitialState: function(){
    alert('In getInitialState');
    return {
      name: 'Tyler McGinnis'
    }
  },
// Invoked once before first render
  componentWillMount: function(){
      // Calling setState here does not cause a re-render
      alert('In Component Will Mount');
  },
// Invoked once after the first render
  componentDidMount: function(){
      // You now have access to this.getDOMNode()
      alert('In Component Did Mount');
  },
// Invoked whenever there is a prop change
  // Called BEFORE render
  componentWillReceiveProps: function(nextProps){
      // Not called for the initial render
      // Previous props can be accessed by this.props
      // Calling setState here does not trigger an additional re-render
      alert('In Component Will Receive Props');
  },
// Called IMMEDIATELY before a component is unmounted
  componentWillUnmount: function(){},
    render: function(){
        return (
          <div>
            Hello, {this.state.name}
          </div>
        )
      }
});

<Additional Notes>
1) Using this.props.children as opposed to explictly defining all prop imports can be helpful

2)[Passing data from Child Component is covered in the update react guide, because its a pattern that is only logically
need if the react component is responsive to user input]




