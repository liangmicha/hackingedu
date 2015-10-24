var NotecardsList = React.createClass({
	render: function() {
	    return (
	        <div className="notecardList">
	          {this.props.notecards.map(function(listValue){
	            return <div className="listValue"> {listValue} </div>;
	          })}
	        </div>
	    );
	},
});
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
  	return {
  		progress: 0,
  		color: "red",
  		sentence: "I want to travel to France.",
  		notecards: ["I", "want to", "travel", "to France", "I want to", "travel to France", "I want to travel to France"],
  		notecardIndex: 0,
  		notecardsDone: [],
    };
  },
  handleClick: function() {
  	var newState = {};
  	var currentIndex = this.state.notecardIndex;
  	newState['notecardsDone'] = [];
  	this.state.notecardsDone.push(this.state.notecards[currentIndex]);
  	var newProgress = this.state.progress + 100.0/this.state.notecards.length;
  	newState['progress'] = Math.min(100, newProgress);
	var newColor = "red";
  	if (newProgress < 50) {
  		console.log("red");
  		newColor = "red";
  	} else if (newProgress > 50 && newProgress < 100) {
  		console.log("orange");
        newColor = "orange";
  	} else if (newProgress >= 100) {
  		console.log("green");
        newColor = "green";
  	}
  	newState['color'] = newColor;
  	newState['notecardIndex'] = currentIndex + 1;
  	return this.setState(newState);
  },
  render: function() {
    return (
      <div className="wrapper">
	      <div className="top-bar">
	          <ProgressBar color={this.state.color} progress={this.state.progress} />
	          <div className="button-wrapper">
	          	<Button bsStyle="primary" bsSize="large" onClick={this.handleClick} block>
	          	    Validate!
	          	</Button>
		   	  </div>
		   	  <div className="topic－english"> {this.state.sentence} </div>
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
		   <div className="currentPhrase">
		   	  {this.state.notecards[this.state.notecardIndex]}
		   </div>
		   <NotecardsList notecards={this.state.notecards}> </NotecardsList>
	  </div>
    );
  }
});

ReactDOM.render(
  <Content url="/api/comments" pollInterval={2000} />,
  document.getElementById('content')
);