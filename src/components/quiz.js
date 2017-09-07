import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as question from '../actions/question';
import Form from './form';
import List from './list';


class Question extends Component {
  constructor(props) {
    super(props)
    this.onNewTapped = this.onNewTapped.bind(this);
    this.renderTopNavgation= this.renderTopNavgation.bind(this);
    this.selectQuestion= this.selectQuestion.bind(this);
    this.props.action.getAllQuestions();
  }

  onNewTapped() {
    if(document.getElementById('add').innerHTML === 'Add Questions') {
      this.props.action.addNewQuestion();
    } else {
      console.log(this.getQuestionId);
      this.props.action.deleteQuestions(this.getQuestionId());
      this.selectQuestion()
    }

  }

  getQuestionId() {
    var questions = [];
    var checkBoxArray = document.getElementsByClassName('checklist'); 
    [].forEach.call(checkBoxArray,(question) => {
      if(question.checked){
        questions.push(question.defaultValue);      
      }
    })
    return questions;
  }

  selectQuestion() {
    this.props.action.makeDeletable();
    if(document.getElementById('select').innerHTML === 'Select Questions') {
      document.getElementById('select').innerHTML = "Cancel";
    } else {
      document.getElementById('select').innerHTML = "Select Questions"
    }
    if(document.getElementById('add').innerHTML === 'Add Questions') {
      document.getElementById('add').innerHTML = "Delete";
    } else {
      document.getElementById('add').innerHTML = "Add Questions"
    }
  }
  

  renderTopNavgation(){
    return (
    <nav className="navbar navbar-default">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <a className="navbar-brand" href="javascript:void(0);">Question Manager</a>
      </div>
    </nav>
    )
  }

  render() {
    return (
      <div>
        {this.renderTopNavgation()}
        <div className="row">
          <div className="left-pane col-md-4 col-md-offset-1">
            {
              this.props.question.map((question,idx) => {
                return (
                  <div key={idx}>
                    <List
                      {...question}
                      action={this.props.action}
                    />
                  </div>
                )
              })
            }   
            <button id="add" onClick={() => this.onNewTapped()}>Add Questions</button>
            <br />
            <button id="select" onClick={() => this.selectQuestion()}>Select Questions</button> 
          </div> 
          <div className="right-pane col-md-6"> 
              <Form
                />
          </div>
        </div>
      </div>
    );
  }
}


/*
Redux Containers - To map the components to store
*/

function mapStateToProps(state){
  return {question: state.question, single: state.single};
}

function mapDispatchToProps(dispatch){
  return {
    action: bindActionCreators(question,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Question);
