import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as question from '../actions/question';
import * as user from '../actions/user'
import Grid from './grid';
import Form from './form';
import List from './list';


class Question extends Component {
  constructor(props) {
    super(props)
    this.onNewTapped = this.onNewTapped.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.searchUpdated = this.searchUpdated.bind(this);
    this.renderTopNavgation= this.renderTopNavgation.bind(this);
    this.logOut = this.logOut.bind(this);
    this.props.action.getAllQuestions();
  }

  onNewTapped() {
    this.props.useraction.addNewQuestion();
  }
  logOut(){
    this.props.useraction.logOut();
  }
  searchUpdated (term) {
    /*
    TODO- To avoid sending empty string as params,
            empty search is considered as *
    */
    if(term === null || term.match(/^ *$/) !== null){
      term = '*'
    }
    this.props.action.filterQuestion(term, this.props.user._id);
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

      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

        <div className="col-sm-6 col-md-6">
            <form role="search">
            <div className="input-group full-width">
            </div>
            </form>
        </div>
        <ul className="nav navbar-nav navbar-right">
          <li><a href="javascript:void(0);" onClick={() => this.onNewTapped()}>Add Question</a></li>
          <li className="dropdown">
            <a href="javascript:void(0);" className="dropdown-toggle" data-toggle="dropdown">{this.props.user.username} <b className="caret"></b></a>
            <ul className="dropdown-menu">
              <li><a href="javascript:void(0);" onClick={this.logOut}>Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
    )
  }

  renderQuestions() { 
    if(this.props.question.length === 0)
      return ( <div className="center"> Nothing found yet! <br/> Add your questions </div> )
    
    var question = this.props.single;
    console.log(question);
    return (
      <div>
        <Form
          id={question._id}
          title={question.title}
          question={question.question}
          options={question.options}
          image={question.image}
          editable={question.editable}
          action={this.props.action}
        />
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderTopNavgation()}
        <div className="row">
          <div className="col-md-4 col-md-offset-1">
            Please enter your text here
            <div>
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
            </div>
          </div> 
          <div className="col-md-6"> 
            {this.props.user.new_question? (<Form
                {...this.props}
                editable={true}
                new_question={true}
                id="new"
               />) : this.renderQuestions()
             }
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
  return {question: state.question, user: state.user, single: state.single};
}

function mapDispatchToProps(dispatch){
  return {
    action: bindActionCreators(question,dispatch),
    useraction: bindActionCreators(user, dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Question);
