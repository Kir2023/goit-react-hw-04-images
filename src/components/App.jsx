import * as pixabayapi from './FetchImages/FetchImages';
import React, { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { LoadMoreButton } from './LoadMoreButton/LoadMoreButton';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoadMoreBtnVisible, setIsLoadMoreBtnVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }

    const fetchImages = async (query, page) => {
      try {
        setIsLoading(true);
        const data = await pixabayapi.fetchImages({ query, page });
        if (data.hits <= 0) {
          alert('Sorry. There are no images ... 😭');
          return;
        }
        setImages(prevImages => [...prevImages, ...data.hits]);

        setIsLoadMoreBtnVisible(page < Math.ceil(data.totalHits / 12));
      } catch (err) {
        alert('Sorry, something goes wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages(query, page);
  }, [query, page]);

  const handleFormSubmit = newQuery => {
    if (newQuery === query) {
      return alert(`You are already viewing images on request ${query}`);
    }
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleClickLoadMore = () => {
    return setPage(prevPage => prevPage + 1);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <Searchbar onSubmit={handleFormSubmit} />

      {images.length > 0 && <ImageGallery images={images}></ImageGallery>}

      {isLoading && <Loader />}

      {isLoadMoreBtnVisible && !isLoading && (
        <LoadMoreButton onClick={handleClickLoadMore} />
      )}
    </div>
  );
};
