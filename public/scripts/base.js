var ProgressBar = React.createClass({
	createStyle: function(percent, color) {
		console.log(percent);
		console.log(color);
		var divStyle = {
			backgroundColor: color,
			width: percent + '%',
			height: '100%', //default.
		}
		return divStyle;
	},
	render: function() {
		var style = this.createStyle(this.props.progress, this.props.color);
		return (
			<div className="progress-wrapper">
				<div className="progress-bar" style={style}>
				</div>
			</div>
		);
	}
});
var Button = ReactBootstrap.Button;

var Content = React.createClass({
  getInitialState: function() { 
  	return {progress: 1, color: "red"};
  },
  handleClick: function() {
  	var newProgress = this.state.progress + 20;
	var color = "red";
  	if (newProgress < 50) {
  		console.log("red");
  		color = "red";
  	} else if (newProgress > 50 && newProgress < 100) {
  		console.log("orange");
        color = "orange";
  	} else if (newProgress >= 100) {
  		console.log("green");
        color = "green";
  	}
  	return this.setState({progress: Math.min(newProgress, 100), color: color});
  },
  render: function() {
    return (
      <div className="wrapper">
	      <div className="top-bar">
	          <ProgressBar color={this.state.color} progress={this.state.progress} />
	          <div className="button-wrapper">
	          	<Button bsStyle="primary" bsSize="large" onClick={this.handleClick} block>
	          	    Block level button
	          	</Button>
	          </div>
	       </div>
	       <div className="chat">
		        <div className="chat-left">
		          <div className="video-box">
		          </div>
		        </div>
		        <div className="chat-right">
		          <div className="video-box">
		          </div>
		        </div>
		   </div>
		   <div className="script">
		   		<div className="topic－english"> I want to go to France. </div>
		   </div>
	  </div>
    );
  }
});

ReactDOM.render(
  <Content url="/api/comments" pollInterval={2000} />,
  document.getElementById('content')
);