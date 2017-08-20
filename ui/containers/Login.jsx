import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
const { Fullpage, Slide, HorizontalSlider } = require('fullpage-react');
import Info1, { Info2, Info3 } from '/ui/components/Info.jsx';

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
        var self = this;
        e.preventDefault();
        if (this.props.type === "email-password") {
            var newUserData = {
              username: this.refs.username.value,
              email: this.refs.email.value,
              password: this.refs.password.value
            };
            var password2 = this.refs.password2.value;
            if (newUserData.password == password2) {
                Accounts.createUser(newUserData, function(err) {
                    if (err) {
                        self.setState({loginErrMsg: err.reason});
                        self.props.onLoginError(err);
                        self.dbug("ERROR", err.reason);
                    } else {
                        console.log("Success", Meteor.user());
                        self.setState({
                          loginPage: true,
                          loginErrMsg: 'Account created'
                         });
                    }
                });
            }
            else {
                self.setState({loginErrMsg: 'Passwords don\'t match'});
            }
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.props.type === "email-password") {
            var email = this.refs.email.value;
            var pass = this.refs.password.value;
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
                self.props.onLogin();
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
      const titleStyle = {
        width: "90%",
        maxWidth: "800px",
        height: "auto",
        marginBottom: "5%",
      };
      const changePageStyle = {
        position: 'absolute',
        bottom: 15,
        right: 20,
      };
      const errMsgStyle = {
        position: 'absolute',
        bottom: 15,
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
            <p style={errMsgStyle}>{this.state.loginErrMsg}</p>
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
            <p style={errMsgStyle}>{this.state.loginErrMsg}</p>
          </div>;
      }

      const fullPageOptions = {
        scrollSensitivity: 7,
        touchSensitivity: 7,
        scrollSpeed: 1000,
        hideScrollBars: true,
        enableArrowKeys: true,
        breakpoint: 375
      };

      const slides = [
          <Slide>
            <div className="login-wrapper">
              <div className="login-subwrapper">
                <img style={titleStyle} src="/images/title.png"/>
                {pageToDisplay}
              </div>
            </div>
          </Slide>,
          <Slide> <Info1 /> </Slide>,
          <Slide> <Info2 /> </Slide>,
          <Slide> <Info3 /> </Slide>
      ];
      fullPageOptions.slides = slides;


      return (
          //<Fullpage {...fullPageOptions} />
          <div>
            <div className="login-wrapper">
              <div className="login-subwrapper">
                <img style={titleStyle} src="/images/title.png"/>
                {pageToDisplay}
              </div>
            </div>
            <Info1 />
            <Info2 />
            <Info3 />
          </div>
        );
      }
}
