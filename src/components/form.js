import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as question from '../actions/question';
import * as image from '../actions/image';


class Form extends Component {
  constructor(props) {
    super(props);

    this.updateQuestion = this.updateQuestion.bind(this);
    this.renderOption = this.renderOption.bind(this);
    this.readURL = this.readURL.bind(this);
    this.request_body = this.request_body.bind(this);
    this.addOption = this.addOption.bind(this);
  }

  getOptionsValue() {
    var optionArray = [];
    var options = document.getElementsByClassName('optionslist');
    [].forEach.call(options,(option) => {
      optionArray.push(option.value);
    });
    return optionArray;
  }

  deleteOption(option) {
    this.props.action.deleteOption(option);
  }
  addOption() {
    this.props.action.addOption();
  }
  updateQuestion( id ) {
    var title = document.getElementById(id+'title').value;
    var questionValue = document.getElementById(id+'question').value;
    var options = this.getOptionsValue();
    var image = this.props.image;
    
    var request = this.request_body(title,questionValue,options,image);

    if(!title.trim()){
      alert("Please enter a valid Title");
    }
    else {
      if(!questionValue.trim()){
        alert("Please enter a valid Question");
      }
      else{
        if(options.length < 2 || options.length > 6){
          alert("Please enter valid number of options");
        }
        else {
          var invalidOption = false;
          options.map((option) => {
            if(!option.trim()){
              invalidOption = true;
            }
          });
          if(invalidOption){
            alert('Please enter a valid option');
          }
          else {
            if (id=== "new") {
              this.props.action.addQuestion(request);
            } else {
              this.props.action.updateQuestion( request, id );
            }
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
        };
  }
  readURL() {
    var input = document.getElementById('file');
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = ( function (props) {
        return function (e) {
          var image = document.getElementById('image');
          this.imageData = e.target.result;
          props.imageAction.updateImage(this.imageData);
          image.src = this.imageData;
          image.width = 500;
          image.height = 500;
        };
      })(this.props);

      reader.readAsDataURL(input.files[0]);
    }
  }

  deleteImage () {
    this.props.imageAction.updateImage('');
  }

  updateTitle (value, id) {
    this.props.action.updateTitle(value, id);
  }

  updateQuestionaire (value, index) {
    this.props.action.updateQuestionaire(value , index);
  }

  updateOption (value, index) {
    this.props.action.updateOption(value, index);
  }


  auto_grow(element) {
      element.style.height = "55px";
      element.style.height = (element.scrollHeight)+"px";
  }

  renderOption(options, id) {
    return(
      <div>
      {
        options.map((optionValue,i) => {
          return (
            <div className="option input-group" key={i}>
              <textarea onKeyUp={(e) => this.auto_grow(e.target)} type="text" id={id+i+'option'} className="form-control custom-control optionslist" value={optionValue} onChange={e => this.updateOption(e.target.value,i) } aria-label="Text input with trash icon"></textarea>
              <span onClick={() => this.deleteOption(i)} className="input-group-addon btn btn-secondary">
                <span className="glyphicon glyphicon-trash"></span>
              </span>
            </div>
          );
        })
      }
      </div>
    )
  }

  render() {
    var { _id, title, question, options } = this.props.single

    if(!_id) {
      _id= "new";
    } 
    var imageOption = this.props.image?  'Change Image' : 'Upload Image'; 
    return (
      <div suppressContentEditableWarning={true} id={_id+"rightpane"} className="col-sm-10 col-sm-offset-1" >
        <div>
          
          <div className="form-group">
            <label className="control-label">
              Topic 
            </label>
            <input type="text" className="form-control" id={_id+"title"} value={title} onChange={e => this.updateTitle(e.target.value, _id) } required />
          </div>


          <div className="form-group">
            <label htmlFor={_id+"question"}> Question </label>
            <textarea onKeyUp={(e) => this.auto_grow(e.target)} type="text" id={_id+"question"} className="form-control" value={question} onChange={e => this.updateQuestionaire(e.target.value,_id)} aria-label="Text-area"></textarea>
          </div>  
          

          <img id="image" src={this.props.image} alt='' className="img-fluid img-rounded" /> 
                
          
          <div className="file-image">
            
            {
              (this.props.image)? 
                (
                  <button className="delete-image btn btn-primary" onClick={() => this.deleteImage()}> Delete Image </button>
                ) : null
            }

            <label className="btn btn-primary  custom-file">
              <span className="custom-file-control">{imageOption}</span>
              <input type="file" id="file" className="custom-file-input" onChange={() => this.readURL()} accept="image/*" />
            </label>
          
          </div>

          { this.props.options? (<label> Options </label>) : null }
          {this.renderOption(options,_id)}

          <div className="form-group save-changes">
            <button className="btn btn-primary" id="add_option" onClick={()=> this.addOption()}>Add option</button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={ () => this.updateQuestion(_id)} data-loading-text="<i class='fa fa-spinner fa-spin '></i> Saving.." className="btn save btn-primary">Save</button>
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
  return {single: state.single, image: state.image};
}

function mapDispatchToProps(dispatch){
  return {
    action: bindActionCreators(question,dispatch),
    imageAction: bindActionCreators(image,dispatch),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Form);