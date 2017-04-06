import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignUpSignIn from './SignUpSignIn';
import TopNavbar from './TopNavbar';
import Protected from './Protected';
import Secret from './Secret';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      signUpSignInError: '',
      authenticated: localStorage.getItem('token')
    };

  }
  renderSignUpSignIn() {
    return (
      <SignUpSignIn
        error={this.state.signUpSignInError}
        onSignUp={this.handleSignUp.bind(this)}
        onSignIn={this.handleSignIn.bind(this)}
      />
    );
  }
  renderApp() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Protected} />
          <Route exact path="/secret" component={Secret} />
          <Route render={() => <h1>NOT FOUND!</h1>} />
        </Switch>
      </div>
    );
  }
  handleSignUp(credentials) {
    const { username, password, confirmPassword} = credentials;
    if (!username.trim() || !password.trim() || password.trim() !== confirmPassword.trim()) {
      this.setstate({
        sinUpSignInError: 'Must Provide All Fields!'
      });
    } else {
      axios.post('/api/signup', credentials)
        .then(resp => {
          const { token } = resp.data;

          localStorage.setItem('token', token);

          this.setState({
            signUpSignInError: '',
            authenticated: token
          });
        })
        .catch(err => console.log(err));
    }
  }
  handleSignIn(credentials) {
    const {username, password} = credentials;
    if (!username.trim() || !password.trim()) {
      this.setState({
        signUpSignInError: 'Must provide username and password'
      });
    } else {
      axios.post('/api/signin', credentials)
        .then(resp => {
          const {token} = resp.data;
          localStorage.setItem('token', token);

          this.setState({
            signUpSignInError: '',
            authenticated: token
          });
        });
    }
  }
  handleSignOut() {
    localStorage.removeItem('token');
    this.setState({
      authenticated: false,
    });
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <TopNavbar
            showNavItems={this.state.authenticated}
            onSignOut={this.handleSignOut.bind(this)}
          />
          {this.state.authenticated ? this.renderApp() : this.renderSignUpSignIn()}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
