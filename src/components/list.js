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
    var {title, question, _id, deletable, index} = this.props;
    return (
      <div className="list-group" onClick={() => this.display()}>
        <input type='checkbox' className="checklist" value={_id} hidden={!deletable} />
        <a href="#"className=" list-group-item list-group-item-action flex-column align-items-start active">
          <div className="d-flex w-100 justify-content-between">
            <h5>{index+1}. {title}</h5>
          </div>
          <p>{question}</p>
        </a>

      </div>
    );
  }
}

export default List;
