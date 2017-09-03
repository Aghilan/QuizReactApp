import React, { Component } from 'react';

class UserForm extends Component {
  authenticate_user(){
    var user_name = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    this.props.useraction.authUser({username: user_name, password: password})

  }

  register_user(){
    var user_name = document.getElementById('rusername').value;
    var password = document.getElementById('rpassword').value;
    this.props.useraction.addUser({username: user_name, password: password})
  }

  render() {
   return (
    <div>
      <div className="container">
      </div>
      <br />
      <br />
      <div className="container">
      <div className="row">
        <div className="col-sm-5 col-sm-offset-3">
        <div className="form-body">
          <ul className="nav nav-tabs final-login">
              <li className="active"><a data-toggle="tab" href="#sectionA">Sign In</a></li>
              <li><a data-toggle="tab" href="#sectionB">Register</a></li>
          </ul>
      	   <div className="tab-content">
              <div id="sectionA" className="tab-pane fade in active">
              <div className="innter-form">
                <div className="sa-innate-form">
                <label>Username</label>
                <input type="text" id="username" />
                <label>Password</label>
                <input type="password" id="password" / >
  		          <div className="submit"><button onClick={() => this.authenticate_user()}>Sign In</button></div>
                </div>
              </div>
              <div className="clearfix"></div>
              </div>
              <div id="sectionB" className="tab-pane fade">
      			      <div className="innter-form">
                    <div className="sa-innate-form">
                    <label>Username</label>
                    <input type="text" id="rusername" / >
                    <label>Password</label>
                    <input type="password" id="rpassword" />
                    <div className="submit"><button onClick={() => this.register_user()}>Register now</button></div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    );
  }
}

export default UserForm;
