import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import ShowAlbuns from '../components/ShowAlbuns';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchInAPI: '',
      isDisable: true,
      searching: false,
      founded: false,
      artistSearched: '',
      album: [],
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validadeButton);
  }

  validadeButton = () => {
    const { searchInAPI } = this.state;
    if (searchInAPI.length >= 2) {
      this.setState({ isDisable: false });
    }
  }

  clearInput = () => {
    this.setState({ searchInAPI: '', searching: false }, this.validadeButton);
  }

  searchAlbuns = () => {
    const { searchInAPI } = this.state;
    this.setState({ searching: true, artistSearched: searchInAPI });
    searchAlbumsAPI(searchInAPI)
      .then((data) => this.setState(
        { album: data, founded: true },
        () => this.clearInput(),
      ));
  }

  render() {
    const {
      state: { isDisable, searchInAPI, searching, founded, album, artistSearched },
      handleChange,
      searchAlbuns,
    } = this;

    if (searching) {
      return <Loading />;
    }
    return (
      <div data-testid="page-search">
        <Header />
        <input
          type="text"
          name="searchInAPI"
          value={ searchInAPI }
          placeholder="Digite o nome do Artista"
          onChange={ handleChange }
          data-testid="search-artist-input"
        />
        <button
          type="button"
          disabled={ isDisable }
          data-testid="search-artist-button"
          onClick={ searchAlbuns }
        >
          Pesquisar
        </button>

        {founded && <ShowAlbuns album={ album } artistSearched={ artistSearched } />}

      </div>
    );
  }
}

export default Search;
