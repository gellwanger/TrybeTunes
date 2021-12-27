import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

// ul - li todas as músicas do álbum na tela.
// Crie components/MusicCard exibe as propriedades (trackName e previewUrl) da API Music.
// essa tag audio com o atributo deve aparecer em cada item listado.

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      favorite: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.checkedIsTrue();
  }

  checkedIsTrue = () => {
    const { music } = this.props;
    getFavoriteSongs()
      .then((response) => {
        if (response.some((song) => song.trackId === music.trackId)) {
          this.setState({
            isLoading: false,
            favorite: true,
          });
        }
      });
  };

  changeCheckboxInput = ({ target: { checked } }) => {
    this.setState({
      favorite: checked,
      isLoading: true,
    }, () => { this.addFavorites(); });
  };

  addFavorites = () => {
    const { music } = this.props;
    addSong(music)
      .then(() => this.setState({
        isLoading: false,
      }));
  }

  render() {
    const { isLoading, favorite } = this.state;
    const { musicName, previewUrl, trackId } = this.props;

    return (
      isLoading ? <Loading />
        : (
          <div>
            <span>{ musicName }</span>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              Your browser doesn`t suport the element
              <code>audio</code>
            </audio>
            <label htmlFor="favorita">
              Favorite
              <input
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                name="favorita"
                checked={ favorite }
                onChange={ this.changeCheckboxInput }
              />
            </label>
          </div>
        )
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  musicName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string,
  music: PropTypes.objectOf(PropTypes.any).isRequired,
};

MusicCard.defaultProps = {
  trackId: 'zero',
};
