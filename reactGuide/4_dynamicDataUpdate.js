#Once the receiving dynmaic data flow is set up, this is how you trigger a change in the framework and/or update data from a component

(Creating a Dynamic compoent within itself, must keep track of internal changes inorder to send the changes somewhere else)
[1 Create a component form and/or event listener to trigger a data update]
  #This is how to create dynamic interaction within a single component, which is a pre-req for sending that state to the parent component
	a) Need to declare inital state
	b) Need functions to handle changes for the fields
	c) Need functions to handle the submit and change  
	d) Need to render the component

	ex1) 
  	<Basic form and click examples>
	var CommentForm = React.createClass({
		getInitialState: function() {
			return {author: '', text: ''};
		},
		handleAuthorChange: function(e) {
			this.setState({author: e.target.value});
		},
		handleTextChange: function(e) {
			this.setState({text: e.target.value});
		},
		handleSubmit: function(e) {
			e.preventDefault();
			var author = this.state.author.trim();
			var text = this.state.text.trim();
			if (!text || !author) {
				return;
			}
			this.props.onCommentSubmit({author: author, text: text});
			this.setState({author: '', text: ''});
		},
		render: function() {
			return (
				<form className="commentForm" onSubmit={this.handleSubmit}>
					<input
						type="text"
						placeholder="Your name"
						value={this.state.author}
						onChange={this.handleAuthorChange}
					/>
					<input
						type="text"
						placeholder="Say something..."
						value={this.state.text}
						onChange={this.handleTextChange}
					/>
					<input type="submit" value="Post" />
				</form>
			);
		}
	});

	ex2) 
	<Basic Field Change>
	var HelloUser = React.createClass({
	  getInitialState: function(){
	    return {
	      username: '@tylermcginnis33'
	    }
	  },
	  handleChange: function(e){
	    this.setState({
	      username: e.target.value
	    });
	  },
	  render: function(){
	    return (
	      <div>
	        Hello {this.state.username} <br />
	        Change Name: <input type="text" value={this.state.username} onChange={this.handleChange} />
	      </div>
	    )
	  }
	});




  <Click, Mouse, Key Example>

(Setting up a parent component to listen to a dynamic component)
[2 In the parent object that should be updated based on its child components update]

	a) Create a callback function that the right child can call (handleCommentSubmit or handleSomeEvent)
		-This callback function should take in a state data as a parameter this is because it will
		-Update a data store, or the parent component with that data

	#Example)
	var CommentBox = React.createClass({
		loadCommentsFromServer: function() {...}
		handleCommentSubmit: function(comment) {
			$.ajax({
				url: this.props.url,
				dataType: 'json',
				type: 'POST',
				data: comment,
				success: function(data) {
					this.setState({data: data});
				}.bind(this),
				error: function(xhr, status, err) {
					console.error(this.props.url, status, err.toString());
				}.bind(this)
			});
		},

	b) Pass this callback function to the child component based on props, to is to be used

		(The rest of the component)
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
						<CommentForm onCommentSubmit={this.handleCommentSubmit} />
					</div>
				);
			}
		});	

	c) Use parent callback in child compoent with event based callbacks

	(In the child component) call it when it needs to be called*
	 handleSubmit: function(e) {
			e.preventDefault();
			var author = this.state.author.trim();
			var text = this.state.text.trim();
			if (!text || !author) {
				return;
			}
			this.props.onCommentSubmit({author: author, text: text});
			this.setState({author: '', text: ''});
		},
		render: function() {
			return (
				<form className="commentForm" onSubmit={this.handleSubmit}>
					<input
						type="text"
						placeholder="Your name"
						value={this.state.author}
						onChange={this.handleAuthorChange}
					/>

	#Data is now re-rendered based on an even and kept fresh! Based on an even, not just automatic, only two types!


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
