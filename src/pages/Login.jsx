import React, { Component } from 'react';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      nameInput: '',
      buttonDisable: true,
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
    // console.log('1');
    createUser({ name: nameInput });
  }

  render() {
    const { nameInput, buttonDisable } = this.state;
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
              value={ nameInput }
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
