import { Component } from 'react';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChangeQ = evt => {
    this.setState({ query: evt.target.value.toLowerCase() });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    if (this.state.query.trim() === '') {
      alert('Please enter your search query');
      return;
    }

    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.searchButton}>
            <span className={css.searchButtonLabel}>Search</span>
          </button>

          <input
            name="inputForSearch"
            className={css.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChangeQ}
            value={this.state.query}
          />
        </form>
      </header>
    );
  }
}
