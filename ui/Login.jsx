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
      const loginPage = this.state.loginPage;
      let pageToDisplay = null;

      if (loginPage) {
        // Page for login
        pageToDisplay =
            <div className="login-wrapper">
            <img width="200" height="60" src="public/images/title.png"/>
              <div className="login-container">
                <div className="row">
                  <form noValidate={this.props.noValidate} onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <input className="form-control" ref="email" placeholder="Adresse e-mail" type="email"/>
                    </div>
                    <div className="form-group">
                      <input className="form-control" ref="password" placeholder="Mode de passe" type="password"/>
                    </div>
                    <div className="form-group">
                      <input type="submit" ref="submit" value=""/>
                    </div>
                  </form>
                </div>
                <div className="row">
                  <button onClick={this.changePage} className="btn btn-lg btn-primary" type="button">Inscription</button>
                  <p>{this.state.loginErrMsg}</p>
                </div>
              </div>
            </div>;
      } else {
        // Page for signup
        pageToDisplay =
          <div className="login-wrapper">
            <img width="200" height="60" src="public/images/title.png"/>
            <div className="login-container-signup">
              <div className="row">
                <form noValidate={this.props.noValidate} onSubmit={this.handleSignup}>
                  <div className="form-group">
                    <input className="form-control" ref="email" placeholder="Adresse e-mail" type="email"/>
                  </div>
                  <div className="form-group">
                    <input className="form-control" ref="username" placeholder="Nom d'utilisateur" type="text"/>
                  </div>
                  <div className="form-group">
                    <input className="form-control" ref="password" placeholder="Mode de passe" type="password"/>
                  </div>
                  <div className="form-group">
                    <input type="submit" ref="submit" value=""/>
                  </div>
                </form>
              </div>
              <div className="row">
                <button onClick={this.changePage} className="btn btn-lg btn-primary" type="button">Connexion</button>
                <p>{this.state.loginErrMsg}</p>
              </div>
            </div>
          </div>;
      }

      return (
          <div className="login-wrapper">
            {pageToDisplay}
          </div>
        );
      }
}
