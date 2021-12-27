import React, { Component } from 'react';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      favoritesSongs: [],
      saving: false,
    };
  }

  componentDidMount() {
    this.getFavoriteSongs();
  }

  handler = () => {
    this.setState(
      {
        saving: true,
      },
      this.getFavoriteSongs(),
    );
  }

  getFavoriteSongs = () => {
    this.setState({ saving: true });
    getFavoriteSongs().then((favorites) => this.setState({
      favoritesSongs: [...favorites],
      saving: false,
    }));
  }

  render() {
    const { favoritesSongs, saving } = this.state;
    return (
      <div data-testid="page-favorites">
        {saving ? (
          <Loading />
        ) : (
          <div>
            {favoritesSongs.map((album) => (
              <li key={ album.trackName }>
                <MusicCard
                  previewUrl={ album.previewUrl }
                  trackName={ album.trackName }
                  trackId={ album.trackId }
                  album={ album }
                  handler={ this.handler }
                />
              </li>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Favorites;
