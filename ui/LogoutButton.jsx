import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

var noop = function() {};

export default class LogoutButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    static defaultProps = {
        onLogout: noop
    }


    handleLogout(e) {
        var self = this;
        e.preventDefault();
        Meteor.logout(function(err) {
            if (err) {
                console.log("Logout error");
            } else {
                console.log("Success", Meteor.user());
                self.props.onLogout();
            }
        });
    }


    render() {
      return (
          <button onClick={this.handleLogout} className="btn btn-lg btn-primary" type="button">Deconnexion</button>
        );
      }
}
