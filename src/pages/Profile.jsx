import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      saved: false,
      user: { description: '', email: '', image: '', name: '' },
    };
  }

  componentDidMount() {
    this.loadUserProfile();
  }

  loadUserProfile = () => {
    this.setState({ saved: true });
    getUser().then((user) => {
      this.setState({ user, saved: false });
    });
  }

  render() {
    const { saved, user } = this.state;
    return (
      <div data-testid="page-profile">
        {saved ? (
          <Loading />
        ) : (
          <div>
            <img src={ user.image } alt={ user.name } data-testid="profile-image" />
            <h4>{user.name}</h4>
            <p>{user.email}</p>
            <p>{user.description}</p>
            <Link to="profile/edit">Editar perfil</Link>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
