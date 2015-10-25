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
		if (this.props.notebookIndex == this.props.sentenceChinese.length - 1) {
			return (
	        <div className="phraseList">
	          {this.props.sentence.map(function(phraseEnglish, i){
	          	var listValue = phraseEnglish;
	          	var pinyin = this.props.sentenceChinese[i];
	          	// do ONLY except last one.
	          	if (i == this.props.sentenceChinese.length - 1) {
	                return (
		                <div className="sentenceWrapper" key={i}> 
		                	<div className="sentenceListValue backgroundBlue"> {listValue} </div>
		                	<div className="sentencePinyin"> {pinyin} </div>
		                </div>
		            )
		        } else {
		        	return (
		        			 <div className="sentenceWrapper" key={i}> </div>
		        	)
		        }
	         }, this)}
	         </div>
	         )
		} else {
			return (
	        <div className="phraseList">
	          {this.props.sentence.map(function(phraseEnglish, i){
	          	var listValue = phraseEnglish;
	          	var pinyin = this.props.sentenceChinese[i];
	          	if (i == this.props.sentenceChinese.length - 1) {
	                return (
		                <div className="sentenceWrapper" key={i}> 
		                </div>
		            )
		        } else if (i == this.props.notebookIndex) {
	                return (
		                <div className="sentenceWrapper" key={i}> 
		                	<div className="sentenceListValue backgroundBlue"> {listValue} </div>
		                	<div className="sentencePinyin"> {pinyin} </div>
		                </div>
		            )
	        	} else {
	            	return (
		            	<div className="sentenceWrapper" key={i}> 
		            		<div className="sentenceListValue"> {listValue} </div>
		            	</div>
		            )
	            }
	          }, this)}
	        </div>
	        )
	    }
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
var Button = ReactBootstrap.Button;

var LEVEL_ONE = {
	progress: 0,
	color: "red",
	stage: "TRAVEL",
	sentence: ["I", "want to", "travel", "to France.", "I want to travel to France."],
	sentenceChinese: ["wo", "xiang yao", "lu you", "fa guo", "wo xiang yao qu fa guo"],
	validated: [false, false, false, false, false],
	notecards: ["I", "want to", "travel", "to France."],
	notecardsChinese: ["wo", "xiang yao", "lu you", "fa guo"],
	notecardIndex: 0,
	notecardsDone: [],
	nextStage: false,
	actualNextStage: false,
};

var LEVEL_TWO = {
	progress: 0,
	color: "red",
	stage: "FOOD",
	notecards: ["I", "want", "to eat", "10", "apples."],
	notecardsChinese: ["wo", "xiang", "chi", "shi ge", "ping guo"],
	validated: [false, false, false, false, false, false],
	sentence: ["I", "want", "to eat", "10", "apples.", "I want to eat 10 apples."],
	sentenceChinese: ["wo", "xiang", "chi", "shi ge", "ping guo", "wo xiang chi shi ge ping guo"],
	notecardIndex: 0,
	notecardsDone: [],
	nextStage: false,
	actualNextStage: false,
};

var Content = React.createClass({
  getInitialState: function() {
  	return LEVEL_ONE;
  },
  handleClick: function() {
  	var newState = {};
  	var currentIndex = this.state.notecardIndex;
  	if (this.state.nextStage) {
  		// continue everything?
  		newState['actualNextStage'] = true;
  		return this.setState(newState);
  	}
  	newState['notecardsDone'] = [];
  	newState['notecardsDone'].push(this.state.notecards[currentIndex][0]);
  	var newProgress = this.state.progress + 100.0/this.state.sentenceChinese.length;
  	newState['progress'] = Math.min(100, newProgress);
	var newColor = "red";
  	if (newProgress < 50) {
  		newColor = "red";
  	} else if (newProgress > 50 && newProgress < 100) {
        newColor = "orange";
  	} else if (newProgress >= 100) {
        newColor = "green";
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
  	return this.setState(LEVEL_TWO);
  },
  render: function() {
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
	  <div id="profileName">Sebastian</div>
	  <div id="progressBarContainer"></div>
	</span>

  <ProgressBar color={this.state.color} progress={this.state.progress} /></span>
  <span id="learningChinese"></span>
  <span id="logo"><img src="" alt="" id="logoimage"/></span>
</div>

<div id="bottomContent">
  
  <div id="sectionLeft">
  	<div id="stageTitle" className="sectionHeader">
	<span id="stageTitle" className="sectionTitleHeader">Stage</span><span id="stageDetails">Travel</span>
  	</div>
  <NotecardsList notecards={this.state.notecards} index={this.state.notecardIndex} validated={this.state.validated}> </NotecardsList>
  </div>
  <div id="sectionMiddle"><video id="video1" width="320" height="176">
      <source src="video.mp4" type="video/mp4"></source>
      </video> <SentenceList sentence={this.state.sentence} sentenceChinese={this.state.sentenceChinese} notebookIndex={this.state.notecardIndex}> </SentenceList></div>
  <div id="sectionRight">

    <div className="left-panel">


      
     
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
     
     <div className="message"> YAY, New words added to your notebook! </div>
     <div className="checkMyNoteBook"> Check my notebook </div>
   </div>
   <NextStageButton nextLevel={this.state.actualNextStage} onHandleNextStage={this.handleNextStage}> </NextStageButton>
 </div>
</div>


</div>

    );
  }
});

ReactDOM.render(
  <Content url="/api/comments" pollInterval={2000} />,
  document.getElementById('content')
);