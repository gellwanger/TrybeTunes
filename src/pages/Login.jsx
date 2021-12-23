import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Loading from '../components/Loading';

import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      nameInput: '',
      buttonDisable: true,
      loading: false,
      logged: false,
    };
  }

  handleSubmit = ({ target }) => {
    const { name, value } = target;
    const inputName = value;
    this.setState({ [name]: inputName }, this.enableButton);
  }

  enableButton = () => {
    const { nameInput } = this.state;
    const minimumLength = 3;

    if (nameInput.length >= minimumLength) this.setState({ buttonDisable: false });
  }

  userLogin = () => {
    const { nameInput } = this.state;

    this.setState({ loading: true }, () => {
      createUser({ name: nameInput }).then(() => this.setState({
        loading: false,
        logged: true,
      }));
    });
  }

  render() {
    const { buttonDisable, loading, logged } = this.state;

    if (loading) {
      return <Loading />;
    }

    if (logged) {
      return <Redirect to="./search" />;
    }

    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <form onSubmit={ this.handleSubmit }>
          <label
            htmlFor="nameInput"
          >
            Nome:
            <input
              data-testid="login-name-input"
              id="nameInput"
              name="nameInput"
              onChange={ this.handleSubmit }
              placeholder="insira seu nome aqui"
            />
          </label>
        </form>
        <button
          data-testid="login-submit-button"
          type="button"
          disabled={ buttonDisable }
          onClick={ this.userLogin }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
