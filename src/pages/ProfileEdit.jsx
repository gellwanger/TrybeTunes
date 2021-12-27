import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      user: { description: '', email: '', image: '', name: '' },
      saving: false,
      isDisable: true,
      done: false,
    };
  }

  componentDidMount() {
    this.loadUserInfo();
  }

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState(
      (prev) => ({ user: { ...prev.user, [name]: value } }),
      this.validateData(),
    );
  }

  loadUserInfo = () => {
    this.setState({ saving: true });
    getUser().then((user) => {
      this.setState({ user, saving: false }, () => this.validateData());
    });
  }

  validateData = () => {
    const {
      user: { description, email, image, name },
    } = this.state;
    if (
      description.length > 0
      && email.length > 0
      && image.length > 0
      && name.length > 0
    ) {
      this.setState({ isDisable: false });
    }
  }

  saveData = () => {
    const { user } = this.state;
    this.setState({ saving: true });
    updateUser(user).then(() => this.setState({ saving: false, done: true }));
  }

  render() {
    const { saving, user: { description, email, image, name },
      isDisable, done } = this.state;

    if (done) {
      return <Redirect to="/profile" />;
    }
    return (
      <div data-testid="page-profile-edit">
        {saving ? (
          <Loading />
        ) : (
          <div>
            <label htmlFor="name">
              Name:
              <input
                data-testid="edit-input-name"
                type="text"
                value={ name }
                id="name"
                name="name"
                onChange={ this.handleInput }
              />
            </label>
            <label htmlFor="email">
              E-mail
              <input
                data-testid="edit-input-email"
                type="text"
                value={ email }
                id="email"
                name="email"
                onChange={ this.handleInput }
              />
            </label>
            <label htmlFor="description">
              About you:
              <textarea
                data-testid="edit-input-description"
                id="description"
                name="description"
                onChange={ this.handleInput }
                value={ description }
              />
            </label>
            <label htmlFor="image">
              Profile image:
              <input
                type="text"
                value={ image }
                id="image"
                name="image"
                data-testid="edit-input-image"
                onChange={ this.handleInput }
              />
            </label>
            <button
              type="button"
              data-testid="edit-button-save"
              disabled={ isDisable }
              onClick={ this.saveData }
            >
              Edit profile
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default ProfileEdit;
