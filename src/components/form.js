import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    this.updateQuestion = this.updateQuestion.bind(this)
    this.renderOption = this.renderOption.bind(this)
    this.flip = this.flip.bind(this)
  }

  updateQuestion( question ) {
    var title = document.getElementById(question+'title').value
    var questionValue = document.getElementById(question+'question').value
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
        else{
          if(this.props.new_question === true) {
            request.userId = this.props.user._id;
            document.getElementById('newtitle').value = "";
            document.getElementById('newquestion').value = "";
            // document.getElementById('newoptions').value = 
            // document.getElementById('newimage').value = "";
            this.props.action.addQuestion(request)
            this.props.useraction.removeNewQuestion();
          }
          else {
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

  flip(question){
    if(this.props.new_question === true) {
      document.getElementById('newtitle').value = "";
      document.getElementById('newquestion').value = "";
      // document.getElementById('newoptions').value = "";
      // document.getElementById('newimage').value = "";
      this.props.useraction.removeNewQuestion();
    }
    else{
      this.props.action.makeEditable(question)
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
    var { id, title, question, options, image } = this.props
    console.log(title);
    return (
    <div id="edit" className="col-sm-10 col-sm-offset-1" >
      <div data-toggle="validator" role="form">
        <div className="form-group">
          <label className="control-label">Name</label>
          <input type="text" className="form-control" id={id+"title"} placeholder="Question" value={title} required />
        </div>
        <div className="form-group has-feedback">
          <label className="control-label">URL</label>
          <div className="input-group">
            <span className="input-group-addon">@</span>
            <input type="text" className="form-control" id={id+"question"} placeholder="www.google.com" value={question} required />
          </div>
          <span className="glyphicon form-control-feedback" aria-hidden="true"></span>
        </div>
        { options? this.renderOption(options,id) : null}
        <div className="form-group">
          <button onClick={ () => this.flip(id)} className="btn btn-primary">Cancel</button>
          &nbsp;&nbsp;&nbsp;
          <button onClick={ () => this.updateQuestion(id)} className="btn btn-primary">Submit</button>
        </div>
      </div>
    </div>
    );
  }
}

export default Form;
