import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      album: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;

    getMusics(id).then((response) => this.setState({
      album: response,
      artistName: response[0].artistName,
      collectionName: response[0].collectionName,
    }));
  }

  render() {
    const { album, artistName, collectionName } = this.state;
    const filterAlbum = album.filter((musicCollection) => musicCollection
      .previewUrl !== undefined);
    return (
      <div data-testid="page-album">
        <div>
          <h2 data-testid="album-name">{collectionName}</h2>
          <h3 data-testid="artist-name">{artistName}</h3>
        </div>
        <section>
          {filterAlbum.map((musicCollection) => (
            <li key={ musicCollection.trackName }>
              <MusicCard
                previewUrl={ musicCollection.previewUrl }
                trackName={ musicCollection.trackName }
                trackId={ musicCollection.trackId }
                album={ musicCollection }
              />
            </li>
          ))}
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
};

export default Album;
