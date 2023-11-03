import * as pixabayapi from './FetchImages/FetchImages';
import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { LoadMoreButton } from './LoadMoreButton/LoadMoreButton';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    totalHits: 0,
    isLoadMoreBtnVisible: false,
    isLoading: false,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (
      (prevState.query !== query && query !== '') ||
      prevState.page !== page
    ) {
      try {
        this.setState({ isLoading: true });

        const images = await pixabayapi.fetchImages({ query, page });
        if (images.hits <= 0) {
          alert('Sorry. There are no images ... 😭');
          return;
        }
        this.setState(prevState => ({
          images: [
            ...prevState.images,
            ...this.getNormalizedImages(images.hits),
          ],
          isLoadMoreBtnVisible: page < Math.ceil(images.totalHits / 12),
        }));
      } catch (err) {
        alert('Sorry, something goes wrong');
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }
  getNormalizedImages(array) {
    return array.map(({ id, webformatURL, largeImageURL, tags }) => ({
      id,
      webformatURL,
      largeImageURL,
      tags,
    }));
  }

  handleFormSubmit = query => {
    this.setState({ query, images: [], page: 1 });
  };

  handleClickLoadMore = () => {
    return this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar onSubmit={this.handleFormSubmit} />

        {this.state.images.length > 0 && (
          <ImageGallery images={this.state.images}></ImageGallery>
        )}

        {this.state.isLoading && <Loader />}

        {this.state.isLoadMoreBtnVisible && !this.state.isLoading && (
          <LoadMoreButton onClick={this.handleClickLoadMore} />
        )}
      </div>
    );
  }
}
