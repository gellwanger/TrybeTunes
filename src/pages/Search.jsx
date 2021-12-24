import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumAPI from '../services/searchAlbumsAPI';

import Loading from '../components/Loading';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      searchInAPI: '',
      loading: false,
      buttonDisable: true,
      artistSearched: false,
      albums: [],
    };
  }

  handleSubmit = ({ target }) => {
    const { name, value } = target;
    const inputName = value;
    this.setState({ [name]: inputName }, this.enableButton);
  }

  callSearchAlbum = () => {
    const { searchInAPI } = this.state;

    searchAlbumAPI(searchInAPI)
      .then((dataAlbums) => {
        this.setState({
          loading: false,
          artistSearched: searchInAPI,
          albums: [...dataAlbums],
        });
      });
  }

  enableButton = () => {
    const { searchInAPI } = this.state;
    const minimumLength = 2;

    if (searchInAPI.length >= minimumLength) this.setState({ buttonDisable: false });
  }

  searchButton = () => {
    this.callSearchAlbum();
    this.setState({
      searchInAPI: '',
      loading: true,
      buttonDisable: true,
    });
  }

  render() {
    const { loading, searchInAPI, buttonDisable, artistSearched, albums } = this.state;

    const searchInput = (
      <input
        value={ searchInAPI }
        onChange={ this.handleSubmit }
        data-testid="search-artist-input"
        type="text"
        name="searchInAPI"
        id="searchInAPI"
        placeholder="Faça sua busca aqui"
      />
    );

    const searchArtistOrBand = (
      <form>
        <label htmlFor="searchInAPI">
          Digite aqui seu Artista ou Banda:
          { searchInput }
        </label>
      </form>
    );

    const hasArtist = artistSearched ? (
      <p>{ `Resultado de álbuns de: ${artistSearched}` }</p>
    ) : '';

    const hasAlbums = (artistSearched && albums.length <= 0);

    return (
      <div className="searchPage">
        <h1>Search</h1>
        { loading ? <Loading /> : searchArtistOrBand}
        { hasArtist }
        <div>
          {albums && albums.map((album) => (
            <div key={ album.collectionId }>
              <Link
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                <p>{album.collectionName}</p>
              </Link>
            </div>
          ))}
          { hasAlbums && <span> Nenhum álbum foi encontrado</span>}
        </div>

        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ buttonDisable }
          onClick={ this.searchButton }
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;
