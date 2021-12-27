import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      nameInput: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.showUser();
  }

  async showUser() {
    getUser()
      .then((user) => {
        this.setState({
          nameInput: user.name,
          loading: false,
        });
      });
  }

  render() {
    const { nameInput, loading } = this.state;
    return (
      <main className="main">
        <header data-testid="header-component">
          {
            loading
              ? <Loading />
              : (
                <h2 data-testid="header-user-name">
                  { nameInput }
                </h2>
              )
          }
        </header>
        <nav className="links">
          <Link to="/search" data-testid="link-to-search"> Search </Link>
          <Link to="/favorites" data-testid="link-to-favorites"> Favorite Songs </Link>
          <Link data-testid="link-to-profile" to="/profile"> Profile </Link>
        </nav>
      </main>
    );
  }
}

export default Header;
