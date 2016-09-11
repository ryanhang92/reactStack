#Once the receiving dynmaic data flow is set up, this is how you trigger a change in the framework and/or update data from a component

(Creating a Dynamic compoent within itself, must keep track of internal changes inorder to send the changes somewhere else)
[1 Create a component form and/or event listener to trigger a data update]
  #This is how to create dynamic interaction within a single component, which is a pre-req for sending that state to the parent component
	a) Need to declare inital state
	b) Need functions to handle changes for the fields
	c) Need functions to handle the submit and change  
	d) Need to render the component

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

	#Data is now re-rendered based on an even and kept fresh!
