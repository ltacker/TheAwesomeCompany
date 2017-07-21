import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Login from './Login.jsx';
import LogoutButton from './LogoutButton.jsx';

// App component - represents the whole app
export default class App extends Component {
    constructor(props) {
        super(props);
        //this.state = {connected: true};
    }

    loginUser() {
        this.forceUpdate();
    }

    logoutUser() {
        this.forceUpdate();
    }

    render() {
        var u = Meteor.user()

        if (!u) {
             return <Login onLogging={this.loginUser.bind(this)} />;
         } else {
             return (
               <div>
                 <p>{u.username}</p>
                 <LogoutButton onLogout={this.logoutUser.bind(this)} />
               </div>
             );
         }
    }
}
