import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      nameInput: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    this.takeUser();
  }

  async takeUser() {
    getUser()
      .then((user) => {
        this.setState({
          nameInput: user.name,
          isLoading: false,
        });
      });
  }

  render() {
    const { nameInput, isLoading } = this.state;
    return (
      <main>
        <header data-testid="header-component">
          {
            isLoading
              ? <Loading />
              : (
                <span data-testid="header-user-name">
                  { nameInput }
                </span>
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
