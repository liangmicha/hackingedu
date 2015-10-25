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
				    </div>
	          	<Button bsStyle="primary" bsSize="large" className="nextStage" onClick={this.props.onHandleNextStage} block>
	          	    NEXT STAGE!
	          	</Button>
	          	</div>
			)
		}
	}
});


var NotecardsList = React.createClass({
	render: function() {
	    return (
	        <div className="notecardList">
	          {this.props.notecards.map(function(listValue, i){
	          	var arrow = "Current Word";
	          	if (i == this.props.index) {

	          		return (
		            	<div className="listItem current" key={i}>
		            	    <div className="listValue"> {listValue} </div>
		            	    <div className="statusCurrent"> </div>
		            	</div>
		            )
	          	} else if (this.props.validated[i]) {
		            return (
		            	<div className="listItem validated" key={i}>
		            	    <div className="listValue"> {listValue} </div>
		            	    <div className="statusValidated"></div>
		            	</div>
		            )
		        } else {
		            return (
		            	<div className="listItem notDone" key={i}>
		            	    <div className="listValue"> {listValue} </div>
		            	    <div className="statusNotDone">  </div>
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
	          {this.props.sentence.map(function(phraseEnglish, i){
	          	    if (i == this.props.index || this.props.highlightAll) {
		                return (
			                <div className="sentenceWrapper" key={i}> 
			                	<div className="sentenceListValue backgroundBlue" > {phraseEnglish} </div>
			                </div>
			            )
	          	    } else {
		                return (
			                <div className="sentenceWrapper" key={i}> 
			                	<div className="sentenceListValue" > {phraseEnglish} </div>
			                </div>
			            )
	            	}
		        }, this)}
	       </div>
       )
	}
});

var ProgressBar = React.createClass({
	createStyle: function(percent, color) {
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

var Notebook = React.createClass({
	render: function() {
		return (
	        <div className="notebookList">
	          {this.props.notecards.map(function(phraseEnglish, i){
	                return (
		                <div className="notebookPhraseWrapper" key={i}> 
		                	<span className="notebookPhrase" > {phraseEnglish} </span><span>=&nbsp;</span>
		                	<span className="notebookTranslated"> {this.props.sentence[i]} </span>
		                	<span className="notebookWordType"> {this.props.wordType[i]} </span>
		                </div>
		            )
		        }, this)}
	       </div>
       )
	},
});

var Button = ReactBootstrap.Button;

var LEVEL_ONE = {
	progress: 0,
	color: "red",
	stage: "TRAVEL",
	sentence: ["I", "want", "to go", "to France", "I want to go to France"],
	sentenceChinese: ["wo", "xiang", "qu", "fa guo", "wo xiang yao qu fa guo"],
	validated: [false, false, false, false, false],
	notecards: ["I", "want", "to go", "to France.", "I want to go to France."],
	notecardsChinese: ["wo", "xiang", "qu", "fa guo", "wo xiang yao qu fa guo"],
	wordType: ["pronoun", "verb", "verb", "noun"],
	notecardIndex: 0,
	notecardsDone: [],
	nextStage: false,
	actualNextStage: false,
	highlightAll: false,
};

var LEVEL_TWO = {
	progress: 0,
	color: "red",
	stage: "FOOD",
	notecards: ["I", "want", "to eat", "10", "apples.", "I want to eat 10 apples."],
	notecardsChinese: ["wo", "xiang", "chi", "shi ge", "ping guo", "wo xiang chi shi ge ping guo"],
	validated: [false, false, false, false, false, false],
	sentence: ["I", "want", "to eat", "10", "apples.", "I want to eat 10 apples."],
	sentenceChinese: ["wo", "xiang", "chi", "shi ge", "ping guo", "wo xiang chi shi ge ping guo"],
	wordType: ["pronoun", "verb", "verb", "measure", "noun"],
	notecardIndex: 0,
	notecardsDone: [],
	nextStage: false,
	actualNextStage: false,
	highlightall: false,
};


var Content = React.createClass({
  getInitialState: function() {
  	return LEVEL_ONE;
  },
  handleClick: function() {
  	var newState = {};
   	if (this.state.nextStage) {
  		newState['actualNextStage'] = true;
  		return this.setState(newState);
  	}
  	var currentIndex = this.state.notecardIndex;
  	newState['notecardsDone'] = this.state.notecardsDone;
  	newState['notecardsDone'].push(this.state.notecards[currentIndex]);
  	var newProgress = this.state.progress + 50.0/this.state.sentenceChinese.length;
  	newState['progress'] = Math.min(100, newProgress);
	var newColor = "#19bdce";
  	if (newProgress < 50) {
  		newColor = "#19bdce";
  	} else if (newProgress > 50 && newProgress < 100) {
        newColor = "#19bdce";
  	} else if (newProgress >= 100) {
        newColor = "#19bdce";
  	}
  	newState['color'] = newColor;
  	newState['notecardIndex'] = currentIndex + 1;
    newState['validated'] = this.state.validated;
    newState['stage'] = this.state.stage;
    newState['validated'][currentIndex] = 'Cleared';
    newState['sentence'] = this.state.sentence;
    newState['notecards'] = this.state.notecards;
    newState['sentenceChinese'] = this.state.sentenceChinese;
    newState['notecardsChinese'] = this.state.notecardsChinese;
    if (newState['notecardIndex'] == newState['sentenceChinese'].length - 1) {
        newState['nextStage'] = true;
    }
  	return this.setState(newState);
  },

  handleNextStage: function() {
  	var actualNextState = LEVEL_TWO;
  	actualNextState['notecardDone'] = this.state.notecardsDone;
  	return this.setState(actualNextState);
  },
  render: function() {
  	console.log("here are the notecards done");
  	console.log(this.state.notecardsDone);
  	console.log("end");
  	var sentenceToSend = this.state.sentence;
  	var sentenceChineseToSend = this.state.sentenceChinese;
  	var highlightAll = false;
  	if (this.state.notecardIndex < this.state.sentence.length-1 ) {
  		sentenceToSend  = sentenceToSend.slice(0, this.state.sentence.length-1);
  	} else if (this.state.notecardIndex == this.state.sentence.length-1) {
  		sentenceToSend  = sentenceToSend.slice(this.state.sentence.length-1, this.state.sentence.length);
  		highlightAll = true;
  	}
    return (

<div className="wrapper">
  <div id="bgwrapper">
    <div id="bgpicture">
    </div><div id="bgtexture">
  </div>
</div>
<div id="topbar">
  <span id="profile">
  <span id="profilePicturetop"></span><span id="profileContainer">
	  <div id="profileName">Sebastian&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lvl. 5</div>
	  <div id="progressBarContainer">  <ProgressBar color={this.state.color} progress={this.state.progress} /></div>
	</span>

</span>
  <span id="learningChinese"></span>
  <span id="logo"><img src="" alt="" id="logoimage"/></span>
</div>

<div id="bottomContent">
  <NextStageButton nextLevel={this.state.actualNextStage} onHandleNextStage={this.handleNextStage}> </NextStageButton>
  <div id="sectionLeft">
  	<div id="stageTitle" className="sectionHeader">
	<span id="stageTitle" className="sectionTitleHeader">Stage</span><span id="stageDetails">Travel</span>
  	</div>
  <NotecardsList notecards={this.state.notecards} index={this.state.notecardIndex} validated={this.state.validated}> </NotecardsList>
  </div>
  <div id="sectionMiddle"><video id="video1" width="320" height="176">
      <source src="video.mp4" type="video/mp4"></source>
      </video> 
      <SentenceList sentence={sentenceToSend} index={this.state.notecardIndex} highlightAll={highlightAll}>
	 </SentenceList><table className="translatedWordCont"><tbody><tr>
	 			      <td className="translatedWord">
			    	  {sentenceChineseToSend[this.state.notecardIndex]}
			      </td></tr></tbody></table>
  </div>
  <div id="sectionRight"> <div id="notebookwrapper"><Notebook notecards={this.state.notecardsDone} sentence={this.state.sentenceChinese} index={this.state.notecardIndex} wordType={this.state.wordType}> 
	</Notebook></div></div>

      <div className="button-wrapper">
        <Button bsStyle="primary" bsSize="large" onClick={this.handleClick} block>
          Validate!
        </Button>
        <Button bsStyle="primary" bsSize="large" block>
          Try again.
        </Button>
      </div>
</div></div>
    );
  }
});

ReactDOM.render(
  <Content url="/api/comments" pollInterval={2000} />,
  document.getElementById('content'),
  function() {
  	   var vid = document.getElementsByTagName("video")[0];
       console.log("vid is " + vid);
       vid.autoplay = true;
       vid.load();
  }
);