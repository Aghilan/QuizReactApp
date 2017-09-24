import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as question from '../actions/question';
import Form from './form';
import List from './list';
import $ from 'jquery';

class Question extends Component {
  constructor(props) {
    super(props)
    this.onNewTapped = this.onNewTapped.bind(this);
    this.renderTopNavgation= this.renderTopNavgation.bind(this);
    this.selectQuestion= this.selectQuestion.bind(this);
    this.renderQuestionList = this.renderQuestionList.bind(this);
    this.props.action.getAllQuestions();


    $(document).ready(function() {   
        var sideslider = $('[data-toggle=collapse-side]');
        var sel = sideslider.attr('data-target');
        var sel2 = sideslider.attr('data-target-2');
        sideslider.click(function(event){
            $(sel).toggleClass('in');
            $(sel2).toggleClass('out');
        });
    });
  }

  onNewTapped() {
    if(document.getElementsByClassName('add')[0].innerHTML === 'Add Question') {
      this.props.action.addNewQuestion();
    } else {
      this.props.action.deleteQuestions(this.getQuestionId());
      this.selectQuestion();
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

  flipButtons (elements, text) {
    [].slice.call(elements).forEach(function ( div ) {
          div.innerHTML = text;
    });
  }
  selectQuestion() {
    this.props.action.makeDeletable();
    if(document.getElementsByClassName('select')[0].innerHTML === 'Select Questions') {
      this.flipButtons(document.getElementsByClassName('select'), 'Cancel') ;
    } else {
      this.flipButtons(document.getElementsByClassName('select'), 'Select Questions'); 
    }
    if(document.getElementsByClassName('add')[0].innerHTML === 'Add Question') {
      this.flipButtons(document.getElementsByClassName('add'), 'Delete');
    } else {
      this.flipButtons(document.getElementsByClassName('add'), 'Add Question');
    }
  }
  

  renderTopNavgation(){
    return (

      <header role="banner" className="navbar navbar-fixed-top header row navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <button data-toggle="collapse-side" data-target=".side-collapse" data-target-2=".side-collapse-container" type="button" className="navbar-toggle pull-left">
              <span className="icon-bar gray"></span>
              <span className="icon-bar gray"></span>
              <span className="icon-bar"></span>
            </button>
            <h4 className="header-title"> Quiz App </h4>
          </div>
          <div className="navbar-inverse side-collapse in">
            <nav role="navigation" className="navbar-collapse">
              <div className="nav-list">
               {this.renderQuestionList()}
              </div>
              
            </nav>
          </div>
        </div>
      </header>
    )
  }

  renderQuestionList() {
    return (
      <div className="list">
        <h4 className="text-center"> Select Question </h4>
        <div className="question-list">
           {
            this.props.question.map((question,idx) => {
              return (
                <div key={idx}>
                  <List
                    {...question}
                    action={this.props.action}
                    index={idx}
                  />
                </div>
              )
            })
          }
        </div>
        <div className="form-group save-changes">
          <button onClick={() => this.onNewTapped()} className="add btn btn-primary" >Add Question</button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          
          {(this.props.question.length > 0)? (<button onClick={() => this.selectQuestion()} className="select btn btn-primary">Select Questions</button>) : null}
        </div>    
      </div>
    )
  }

  render() {
    return (
      <div>

        {this.renderTopNavgation()}

        <div className="container-fluid">

          <div className="panel panel-default">
            <div className="outer">
              <div className="col-lg-4 col-md-4 col-sm-4 col-xs-1">
                <div className="body-list">
                  {this.renderQuestionList()}
                </div>

                
              </div>

              <div className="col-lg-8 col-md-8 col-sm-8 col-xs-10 text-center">
                <Form />
              </div>
            </div>
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
