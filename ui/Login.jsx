import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

var noop = function() {};

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loginErrMsg: ""};
        this.state = { loginPage: true };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    static defaultProps = {
        debug: true,
        type: "email-password",
        noValidate: true,
        onLoginError: noop,
        onLogging: noop
    }

    componentDidMount() {
        document.body.classList.add('login1')
    }
    componentWillUnmount() {
        document.body.classList.remove('login1')
    }


    dbug() {
        if (this.props.debug) {
          console.debug.apply(console, arguments);
        }
    }

    handleSignup(e) {
        e.preventDefault();
        if (this.props.type === "email-password") {
            var newUserData = {
              username: this.refs.username.getDOMNode().value,
              email: this.refs.email.getDOMNode().value,
              password: this.refs.password.getDOMNode().value
            };
            Accounts.createUser(newUserData, function(err) {
                if (err) {
                    self.setState({loginErrMsg: err.reason});
                    self.props.onLoginError(err);
                    self.dbug("ERROR", err.reason);
                } else {
                    console.log("Success", Meteor.user());
                    this.changePage();
                    self.setState({loginErrMsg: 'Compte crée'});
                }
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.props.type === "email-password") {
            var email = this.refs.email.getDOMNode().value;
            var pass = this.refs.password.getDOMNode().value;
            this.loginWithPassword(email, pass);
            this.dbug("Form submit", email, pass, e);
        }
    }

    loginWithPassword(email, pass) {
        var self = this;
        Meteor.loginWithPassword(email, pass, function(err) {
            if (err) {
                self.setState({loginErrMsg: err.reason});
                self.props.onLoginError(err);
                self.dbug("ERROR", err.reason);
            } else {
                console.log("Success", Meteor.user());
                this.props.onLogging();
            }
        });
    }

    changePage() {
      console.log('Button triggered');
      this.setState({ loginPage: !this.state.loginPage });
    }

    render() {
      let pageToDisplay = null;
      const loginPage = this.state.loginPage;
      const changePageStyle = {
        position: 'absolute',
        bottom: 15,
        right: 20,
      };
      const titleStyle = {
        width: "100%",
        maxWidth: "700px",
      };

      if (loginPage) {
        // Page for login
        pageToDisplay =
          <div className="login-container">
            <div className="row">
              <form noValidate={this.props.noValidate} onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input className="form-control" ref="email" placeholder="email" type="email"/>
                </div>
                <div className="form-group">
                  <input className="form-control" ref="password" placeholder="password" type="password"/>
                </div>
                <div className="form-group">
                  <input type="submit" ref="submit" value=""/>
                </div>
              </form>
            </div>
            <a onClick={this.changePage} style={changePageStyle} href="#">signup</a>
            <p>{this.state.loginErrMsg}</p>
          </div>;
      } else {
        // Page for signup
        pageToDisplay =
          <div className="login-container login-container-signup">
            <div className="row">
              <form noValidate={this.props.noValidate} onSubmit={this.handleSignup}>
                <div className="form-group">
                  <input className="form-control" ref="email" placeholder="email" type="email"/>
                </div>
                <div className="form-group">
                  <input className="form-control" ref="username" placeholder="username" type="text"/>
                </div>
                <div className="form-group">
                  <input className="form-control" ref="password" placeholder="password" type="password"/>
                </div>
                <div className="form-group">
                  <input className="form-control" ref="password2" placeholder="password again" type="password"/>
                </div>
                <div className="form-group">
                  <input type="submit" ref="submit" value=""/>
                </div>
              </form>
            </div>
            <a onClick={this.changePage} style={changePageStyle} href="#">login</a>
            <p>{this.state.loginErrMsg}</p>
          </div>;
      }

      return (
          <div className="login-wrapper">
            <div className="login-subwrapper">
              <img style={titleStyle} src="/images/title.png"/>
              {pageToDisplay}
            </div>
          </div>
        );
      }
}
