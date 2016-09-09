#Once the receiving dynmaic data flow is set up, this is how you
trigger a change in the framework and/or update data

<1 Create a component form and/or event listener to trigger a data update>
	a) Need to declare inital state
	b) Need functions to handle changes for the fields
	c) Need function to handle the submit and change  
	d) Need to render the component

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


<2 In the parent object that should be updated based on its child components update>
	a) Create a callback function that the child can call 
		-This callback function should take in a state data as a parameter
		-And update a data store, or the parent component with that data

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
		getInitialState: function() {
			return {data: []};
		},

	b) Pass this callback function to the child component based on props

	(In the parent component)*
		render: function() {
			return (
				<div className="commentBox">
					<h1>Comments</h1>
					<CommentList data={this.state.data} />
					<CommentForm onCommentSubmit={this.handleCommentSubmit} />
				</div>
			);
		}

	(In the child component)*
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

