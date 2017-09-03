import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as bookmark from '../actions/bookmark';
import * as user from '../actions/user'
import SearchInput from 'react-search-input'
import Grid from './grid';
import Form from './form'
import UserForm from './userform'

class Bookmark extends Component {
  constructor(props) {
    super(props)
    this.onNewTapped = this.onNewTapped.bind(this);
    this.renderBookmarks = this.renderBookmarks.bind(this);
    this.searchUpdated = this.searchUpdated.bind(this);
    this.renderTopNavgation= this.renderTopNavgation.bind(this);
    this.logOut = this.logOut.bind(this)
  }

  onNewTapped() {
    this.props.useraction.addNewBookmark();
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
    this.props.action.filterBookmark(term, this.props.user._id);
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
        <a className="navbar-brand" href="javascript:void(0);">Bookmark Manager</a>
      </div>

      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

        <div className="col-sm-6 col-md-6">
            <form role="search">
            <div className="input-group full-width">
              <SearchInput className="search-input" onChange={ this.searchUpdated } />
            </div>
            </form>
        </div>
        <ul className="nav navbar-nav navbar-right">
          <li><a href="javascript:void(0);" onClick={this.onNewTapped}>Add Bookmark</a></li>
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

  renderBookmarks() {
    if(this.props.bookmark.length === 0)
      return ( <div className="center"> Nothing found yet! <br/> Add your bookmarks </div> )
    return this.props.bookmark.map( (mark, idx) => {
      return (
        <div key={idx}>
          <Grid
            id={mark._id}
            name={mark.name}
            url={mark.url}
            tags={mark.tags}
            action={this.props.action}
            editable={mark.editable}
          />
        </div>
      )
    });
  }

  render() {
    return (
      <div>
        <div hidden={this.props.user._id}>
          <UserForm  {...this.props}/>
        </div>
        <div hidden={!this.props.user._id}>
          {this.renderTopNavgation()}
          <div hidden={!this.props.user.new_bookmark} >
            <Form
              {...this.props}
              editable={true}
              newbookmark={true}
              id="new"
             />
          </div>
          {this.renderBookmarks()}
        </div>
      </div>
    );
  }
}


/*
Redux Containers - To map the components to store
*/

function mapStateToProps(state){
  return {bookmark: state.bookmark, user: state.user};
}

function mapDispatchToProps(dispatch){
  return {
    action: bindActionCreators(bookmark,dispatch),
    useraction: bindActionCreators(user, dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Bookmark);
