import React, { Component } from 'react';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      buttonDisable: true,
    };
  }

  handleSubmit = ({ target }) => {
    const { name, value } = target;
    const inputName = value;
    this.setState({ [name]: inputName }, this.enableButton);
  }

  enableButton = () => {
    const { musicInput } = this.state;
    const minimumLength = 2;

    if (musicInput.length >= minimumLength) this.setState({ buttonDisable: false });
  }

  selectMusic = () => {
    console.log('test');
  }

  render() {
    const { buttonDisable } = this.state;

    return (
      <div data-testid="page-search" className="searchMain">
        <h1>TrybeTunes</h1>
        <form onSubmit={ this.handleSubmit }>
          <label
            htmlFor="musicInput"
          >
            Music:
            <input
              type="text"
              data-testid="search-artist-input"
              id="musicInput"
              name="musicInput"
              onChange={ this.handleSubmit }
              placeholder="Search your music here"
            />
          </label>
        </form>
        <button
          id="buttonSearch"
          data-testid="search-artist-button"
          type="button"
          disabled={ buttonDisable }
          onClick={ this.selectMusic }
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;
