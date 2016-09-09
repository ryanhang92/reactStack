#Now that we know how to do static react, lets handle constantly updating information

***How to Recieve Data***

1) Setting up the framework and flow for the dynamic data

<1 Pass in a route to ping>
ReactDOM.render(
  <CommentBox url="/api/comments" />,
  document.getElementById('content')
);

<2 Declare a state for a component with getInitalState>
	*The initial declaration should match the structure of the data

<3 Pass your state in as a prop for other components to consume>
var CommentBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    );
  }
});

2) Updating the data in the state

<1 create and abstract functions/functions to load data from a source>
<2 initalize a cycle at the start of the component to poll the data
var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval={2000} />,
  document.getElementById('content')
);






















