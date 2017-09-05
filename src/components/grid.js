import React, { Component } from 'react';
import Form from './form'
class Grid extends Component {
  constructor(props) {
    super(props)
    this.flip = this.flip.bind(this);
  }

  deleteQuestion( question ) {
    this.props.action.deleteQuestion(question);
  }

  flip(question){
    this.props.action.makeEditable(question)
  }

  render() {

    var { id, title, question, options, image, editable } = this.props;
    return (
      <div id="main-container">
        <div  id="item-container">
          <span hidden={editable} id="view" >
            <div className="table-container col-sm-10 col-md-10 col-sm-offset-1 col-md-offet-1">
              <table className="table table-filter">
                <tbody>
                  <tr onClick={() => this.flip(id)}>
                    <td>
                      <div className="media">
                        <div className="media-body">
                          <span className="media-meta pull-right">{question}</span>
                          <h4 className="title">
                            {title}
                          </h4>
                          <p className="summary">{options}</p>
                          <a className="media-star delete pull-right" href="javascript:void(0);" onClick={() => this.deleteQuestion(id)}>Remove</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </span>
        </div>
        <Form
          {...this.props}
        />
    </div>
    );
  }
}

export default Grid;
