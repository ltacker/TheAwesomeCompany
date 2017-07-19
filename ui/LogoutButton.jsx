import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

var noop = function() {};

export default class LogoutButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleLogout.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    static defaultProps = {
        onLogout: noop
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

    handleLogout(e) {
        e.preventDefault();

        Meteor.logout(function(err) {
            if (err) {
                console.log("Logout error");
            } else {
                console.log("Success", Meteor.user());
                this.props.onLogout();
            }
        });
    }


    render() {
      return (
          <button onClick={this.handleLogout} className="btn btn-lg btn-primary" type="button">Deconnexion</button>
        );
      }
}
