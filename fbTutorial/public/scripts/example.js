//Comment Box Attach this to an Article to see the comments

var CommentBox = React.createClass({
    loadDataFromServer: function() {


    },
    getInitalState: function() {
        return {data: []}
    },
    render: function() {
        return (
          <div className="commentBox">
            Hello, world! I am a CommentBox. Here are my kids
                <CommentList />
                <CommentForm />
          </div>
        );
    }
});

var CommentList = React.createClass({
  render: function() {
    return (
      <div className="commentList">
        Hello, world! I am a CommentList.
      </div>
    );
  }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        Hello, world! I am a CommentForm.
      </div>
    );
  }
});

//Mock Data to add first
var data = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];


ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
);

