var NextStageButton = React.createClass({
	render: function() {
		if (!this.props.nextLevel) {
			return (
				<div className="displaynone"> </div>
			) 
		} else {
			return (
				<div className="nextStageWrapper"> 
				    <div className="card">
						<div className="nextStageMessage"> Congratulations, you have completed TRAVEL </div>
	          	<Button bsStyle="primary" bsSize="large" className="nextStage" onClick={this.props.onHandleNextStage} block>
	          	    NEXT STAGE!
	          	</Button>
					</div>
				</div>
			)
		}
	},
});


var NotecardsList = React.createClass({
	render: function() {
	    return (
	        <div className="notecardList">
	          {this.props.notecards.map(function(listValue, i){
	          	var arrow = "Current Word";
	          	if (i == this.props.index) {
	          		console.log("here");
	          		return (
		            	<div className="listItem" key={i}>
		            	    <div className="listValue"> {listValue} </div>
		            	    <div className="currentWordArrow"> </div>
		            	</div>
		            )
	          	} else {
		            return (
		            	<div className="listItem" key={i}>
		            	    <div className="listValue"> {listValue} </div>
		            	    <div className="validatedField"> {this.props.validated[i]} </div>
		            	</div>
		            )
		        }
	          }, this)}
	        </div>
	    );
	},
});

var SentenceList = React.createClass({
	render: function() {
	    return (
	        <div className="phraseList">
	          {this.props.sentence.map(function(listValue, i){
	          	if (i == this.props.notebookIndex) {
	                return <div className="sentenceListValue backgroundBlue" key={i}> {listValue} </div>;
	            } else {
	            	return <div className="sentenceListValue" key={i}> {listValue} </div>;
	            }
	          }, this)}
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

var MyProgressBar = React.createClass({
	render: function() {
		var style = {
			width: this.props.progress + '%',
		};
		return (
			<div className="container">
			  <div className="progress">
			    <div className="progress-bar" role="progressbar" aria-valuenow={this.props.progress} aria-valuemin="0" aria-valuemax="100" style={style}>
			      <span className="sr-only">{this.props.progress}% Complete</span>
			    </div>
			  </div>
			</div>
		)
	}
});
var Button = ReactBootstrap.Button;

var LEVEL_ONE = {
	progress: 0,
	color: "red",
	stage: "TRAVEL",
	sentence: ["I", "want to", "travel", "to France"],
	validated: [false, false, false, false, false],
	notecards: ["I", "want to", "travel", "to France", "I want to travel to France"],
	notecardIndex: 0,
	notecardsDone: [],
	nextStage: false,
};

var LEVEL_TWO = {
	progress: 0,
	color: "red",
	stage: "FOOD",
	sentence: ["I", "want to", "eat", "10", "apples."],
	validated: [false, false, false, false, false, false],
	notecards: ["I", "want to", "eat", "10", "apples.", "I want to eat 10 apples."],
	notecardIndex: 0,
	notecardsDone: [],
	nextStage: false,
};

var Content = React.createClass({
  getInitialState: function() { 
  	return LEVEL_ONE;
  },
  handleClick: function() {
  	console.log("click!!");
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
    newState['validated'] = this.state.validated;
    newState['stage'] = this.state.stage;
    newState['validated'][currentIndex] = 'Cleared';
    newState['sentence'] = this.state.sentence;
    newState['notecards'] = this.state.notecards;
    console.log("length of newstate sentence is: " + newState['notecards'].length);
    console.log("index is: " + newState['notecardIndex']);
    if (newState['notecardIndex'] == newState['notecards'].length ) {
        //advance to the next level (button)
        newState['nextStage'] = true;
    }
  	return this.setState(newState);
  },

  handleNextStage: function() {
  	console.log("next level clicked");
  	return this.setState(LEVEL_TWO);
  },
  render: function() {
    return (
      <div className="wrapper">
          <div className="left-panel">
		      <div className="top-bar">
		          <div className="top-of-top">
			          <ProgressBar color={this.state.color} progress={this.state.progress} />
				  </div>
				 <div className="instructions"> Pronounce the highlighted word(s). </div>
			   	  <div className="topic－english">
			   	      <SentenceList sentence={this.state.sentence} notebookIndex={this.state.notecardIndex}> </SentenceList>
			   	      <div className="pictureOfPhrase">
			   	      </div>
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
	          <div className="button-wrapper">
	          	<Button bsStyle="primary" bsSize="large" onClick={this.handleClick} block>
	          	    Validate!
	          	</Button>
	            <Button bsStyle="primary" bsSize="large" block>
	          	    Try again.
	          	</Button>
		   	  </div>
			</div>
			<div className="rightPanel"> 
		       <div className="stage"> 
		           <div className="stageText"> Stage: </div> 
		           <div className="actualStage"> {this.state.stage}</div>
		       </div>
		       <NotecardsList notecards={this.state.notecards} index={this.state.notecardIndex} validated={this.state.validated}> </NotecardsList>
		       <div className="message"> YAY, New words added to your notebook! </div>
		       <div className="checkMyNoteBook"> Check my notebook </div>
		   </div>
		   <NextStageButton nextLevel={this.state.nextStage} onHandleNextStage={this.handleNextStage}> </NextStageButton>
	  </div>
    );
  }
});

ReactDOM.render(
  <Content url="/api/comments" pollInterval={2000} />,
  document.getElementById('content')
);