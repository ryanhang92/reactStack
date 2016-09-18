#Now that we know how to do static react, lets handle constantly updating information

***How to Recieve Data***

[1 Setting up the framework and flow for the dynamic data]

<1 Pass in a route to ping or a dynamic source of data into the root component>
ReactDOM.render(
  <CommentBox url="/api/comments" />,
  document.getElementById('content')
);

<2 Declare a state for a component with getInitalState>
	*The initial declaration should match the structure of the data, having a state means its a dynamic component

<3 Pass your state in as a prop for other components to consume, these are not functionally dynamic props>
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

[2 Updating the data in the state]

<1 declare/abstract functions/functions to load data from a source>
<2 initalize a cycle at the start of the component to poll the data

ex)
var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data}); #!!!!The Key step is here, this is what changes the state of the component
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {   //<-- Initalize a listener at some polling interval 
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


#Data is now re-rendered in an interval and kept fresh!
