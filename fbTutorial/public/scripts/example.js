//Comment Box Attach this to an Article to see the comments

var Comment = React.createClass({
    render: function() {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                {this.props.children}
            </div>
        )
    }
});

var CommentList = React.createClass({
    render: function() {
        console.log("comment list resources")
        console.log(this.props)
        console.log(this.props.data)
        var comments = this.props.data.map(function(comment) {
            return (
                <Comment author={comment.author} key={comment.id}>
                    {comment.text}
                </Comment>
            )
        });
        return (
            <div className="commentList">
                Hello, world! I am a CommentList.
                {comments}
            </div>
        );
    }
});

var CommentBox = React.createClass({
    loadDataFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: 'false',
            success: function(data) {
                this.setState({data: data})
            }.bind(this), //Bind is needed because in callback
            error: function(xhr, status, err) {
                console.err(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleCommentSubmit: function(comment) {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: function(data) {
                this.setState({data: data})
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {data: [{id: 1, author: "Pete Hunt", text: "This is one comment"}]}
    },
    componentDidMount: function() {
        this.loadDataFromServer();
        setInterval(this.loadDataFromServer, this.props.pollInterval);
    },
    render: function() {
        //Why is the comment list a this.props.data instead of a this.state.data
        //Why is this.state null that is strange, getInitial state was spelled wrong, so it was undefined
        //Now this renders
        //Props was undefined because commentList = {this.props.data}, DNE only this.props.state has a data field
        console.log("comment box data")
        console.log(this.state)
        console.log(this.props)
        return (
            <div className="commentBox">
                Hello, world! I am a CommentBox. Here are my kids
                <CommentList data={this.state.data}/>
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
});


var CommentForm = React.createClass({
    getInitialState: function() {
        return {author:"", text:""}
    }, 
    handleAuthorChange: function(e) {
        this.setState({author: e.target.value})
    },
    handleTextChange: function(e) {
        this.setState({text: e.target.value})
    },
    handleSubmit: function(e) {
        e.preventDefault()
        var author = this.state.author.trim()
        var text = this.state.text.trim()
        if (!text || !author) {
            return;
        }
        this.props.onCommentSubmit({author: author, text: text})
        this.setState({author: "", text: ""})
    },
    render: function() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    placeholder="your name"
                    value={this.state.author}
                    onChange={this.handleAuthorChange}
                />
                <input
                    type="text"
                    placeholder="Your thoughts"
                    value={this.state.text}
                    onChange={this.handleTextChange}
                />
            </form>
        );
    }
});


ReactDOM.render(
  <CommentBox url="/api/comments"  pollInterval="3000" />,
  document.getElementById('content')
);
