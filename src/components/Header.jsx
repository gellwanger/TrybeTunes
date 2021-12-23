import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

// Utilize a função getUser da userAPI para recuperar o nome da pessoa logada e exiba essa
// informação na tela. Você pode usar qualquer tag HTML que faça sentido, desde que ela tenha o
// atributo data-testid="header-user-name".

class Header extends Component {
  constructor() {
    super();

    this.state = {
      nameInput: '',
    };
  }

  componentDidMount() {
    this.takeUser();
  }

  async takeUser() {
    const user = await getUser();
    this.setState({ nameInput: user.name });
  }

  render() {
    const { nameInput } = this.state;
    return (
      <main>
        <header data-testid="header-component">
          {!nameInput ? (<Loading />) : (
            <h2 data-testid="header-user-name">{nameInput}</h2>
          )}
        </header>
        <nav className="links">
          <Link to="/search" data-testid="link-to-search">
            Search
          </Link>
          <Link to="/favorites" data-testid="link-to-favorites">
            Favorite Songs
          </Link>
        </nav>
      </main>
    );
  }
}

export default Header;
