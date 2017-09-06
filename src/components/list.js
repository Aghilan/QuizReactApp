import React, { Component } from 'react';

class List extends Component {
  constructor(props) {
    super(props);
    this.display = this.display.bind(this);
  }

  display(){
  	this.props.action.displayQuestion(this.props);
  }

  render() {
    var {title,question,_id,deletable} = this.props
    return (
    <div id="edit" className="col-sm-10 col-sm-offset-1">
      <br />	
      <input type='checkbox' className="checklist" value={_id} hidden={!deletable}/>
      <button onClick={() => this.display()}> {title} </button>
      <br />
      {question}
      <br />

    </div>
    );
  }
}

export default List;
