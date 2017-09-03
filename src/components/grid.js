import React, { Component } from 'react';
import Form from './form'
class Grid extends Component {
  constructor(props) {
    super(props)
    this.flip = this.flip.bind(this);
  }

  deleteBookmark( bookmark ) {
    this.props.action.deleteBookmark(bookmark);
  }

  flip(bookmark){
    this.props.action.makeEditable(bookmark)
  }

  render() {

    var { id, name, tags, url, editable } = this.props;
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
                          <span className="media-meta pull-right">{url}</span>
                          <h4 className="title">
                            {name}
                          </h4>
                          <p className="summary">{tags}</p>
                          <a className="media-star delete pull-right" href="javascript:void(0);" onClick={() => this.deleteBookmark(id)}>Remove</a>
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
