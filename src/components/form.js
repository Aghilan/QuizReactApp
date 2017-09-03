import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    this.updateQuestion = this.updateQuestion.bind(this)
    this.flip = this.flip.bind(this)
  }

  updateQuestion( question ) {
    var name = document.getElementById(question+'name').value
    var url = document.getElementById(question+'url').value
    var tags = document.getElementById(question+'tags').value
    var request = this.request_body(name,url,tags);

    if(!name.trim()){
      alert("Please enter a valid Name");
    }
    else{
      if(!url.trim()){
        alert("Please enter a valid URL")
      }
      else{
        tags = tags.replace( /\n/g, " " ).split(/[ ,]+/).filter(Boolean)
        if(tags.length === 0){
          alert("Please enter valid tags");
        }
        else{
          if(this.props.newquestion === true) {
            request.userId = this.props.user._id;
            document.getElementById('newtags').value = "";
            document.getElementById('newname').value = "";
            document.getElementById('newurl').value = "";
            this.props.action.addQuestion(request, this.props.user._id)
            this.props.useraction.removeNewQuestion();
          }
          else {
            this.props.action.updateQuestion( request, question )
          }
        }
      }
    }
  }

  request_body(name, url,tags) {
    return {
      name: name,
      url: url,
      tags: tags
    }
  }

  flip(question){
    if(this.props.newquestion === true) {
      document.getElementById('newtags').value = "";
      document.getElementById('newname').value = "";
      document.getElementById('newurl').value = "";
      document.getElementById('newtags').value = "";
      document.getElementById('newname').value = "";
      document.getElementById('newurl').value = "";
      this.props.useraction.removeNewQuestion();
    }
    else{
      this.props.action.makeEditable(question)
    }
  }

  render() {
    var { id, name, tags, url, editable } = this.props
    return (
    <div hidden={!editable} id="edit" className="col-sm-10 col-sm-offset-1" >
      <div data-toggle="validator" role="form">
        <div className="form-group">
          <label className="control-label">Name</label>
          <input type="text" className="form-control" id={id+"name"} placeholder="Google" defaultValue={name} required />
        </div>
        <div className="form-group has-feedback">
          <label className="control-label">URL</label>
          <div className="input-group">
            <span className="input-group-addon">@</span>
            <input type="text" className="form-control" id={id+"url"} placeholder="www.google.com" defaultValue={url} required />
          </div>
          <span className="glyphicon form-control-feedback" aria-hidden="true"></span>
        </div>
        <div className="form-group">
          <label className="control-label">Tags</label>
            <textarea id={id+"tags"} rows="4" placeholder="web entertainment" defaultValue={tags}>
            </textarea>
          <span className="glyphicon form-control-feedback" aria-hidden="true"></span>
        </div>
        <div className="form-group">
          <button onClick={ () => this.flip(id)} className="btn btn-primary">Cancel</button>
          &nbsp;&nbsp;&nbsp;
          <button onClick={  () => this.updateQuestion(id)} className="btn btn-primary">Submit</button>
        </div>
      </div>
    </div>
    );
  }
}

export default Form;
