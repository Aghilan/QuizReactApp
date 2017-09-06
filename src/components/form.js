import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as question from '../actions/question';

class Form extends Component {
  constructor(props) {
    super(props);
    this.updateQuestion = this.updateQuestion.bind(this)
    this.renderOption = this.renderOption.bind(this)
  }

  updateQuestion( question ) {
    var title = document.getElementById(question+'title').innerHTML
    var questionValue = document.getElementById(question+'question').innerHTML
    var options = ["Option 1", "Option 2"];
    var image = null;
    var request = this.request_body(title,questionValue,options,image);

    if(!title.trim()){
      alert("Please enter a valid Title");
    }
    else{
      if(!questionValue.trim()){
        alert("Please enter a valid Question")
      }
      else{
        if(options.length === 0){
          alert("Please enter valid options");
        }
        else {
          console.log(request, question);
          if (question=== "new") {
            this.props.action.addQuestion(request);
          } else {
            this.props.action.updateQuestion( request, question )
          }
        }
      }
    }
  }

  request_body(title,question,options,image) {
    return {
      title: title,
      question: question,
      options: options,
      image: image
    }
  }

  renderOption(options,id) {
    return(
      <div>
      {
        options.map((optionValue,i) => {
          return (<div key={i}>
                    <input type='radio' name={id} value={optionValue}/>
                    <span> {optionValue} </span>
                  </div>
                 )
        })
      }
      </div>
    )
  }

  render() {
    var { _id, title, question, options, image } = this.props.single

    if(!_id){
     _id = "new";
     title = "New Question";
     options = ["Option 1", "Option 2"];
     console.log("New Question")
    }
    return (
    <div className="col-sm-10 col-sm-offset-1" >
      <div data-toggle="validator" role="form">
        <div className="form-group">
          <label className="control-label">
            Name 
          </label>
          <div id="input" className="form-control"  placeholder="Question"  id={_id+"title"} contentEditable>{title}</div>
          <div hidden={true}>
          </div>
        </div>
        <div className="form-group has-feedback">
          <label className="control-label">URL {question}</label>
          <div className="input-group">
            <span className="input-group-addon">@</span>
            <div id="input" className="form-control"  placeholder="Question" id={_id+"question"} contentEditable>{question}</div>
          </div>
          <span className="glyphicon form-control-feedback" aria-hidden="true"></span>
        </div>
        { options? this.renderOption(options,_id) : null}
        <div className="form-group">
          <button className="btn btn-primary">Cancel</button>
          &nbsp;&nbsp;&nbsp;
          <button onClick={ () => this.updateQuestion(_id)} className="btn btn-primary">Submit</button>
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
  return {single: state.single};
}

function mapDispatchToProps(dispatch){
  return {
    action: bindActionCreators(question,dispatch),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Form);