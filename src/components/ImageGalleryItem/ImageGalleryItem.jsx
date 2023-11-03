import React, { useState } from 'react';
import css from './ImageGalleryItem.module.css';
import { Modal } from '../Modal/Modal.jsx';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [isShowModal, setIsShowModal] = useState(false);

  const showModal = () => setIsShowModal(true);
  const closeModal = () => setIsShowModal(false);

  return (
    <li className={css.galleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        onClick={showModal}
        className={css.imageGalleryItem}
      />
      {isShowModal && (
        <Modal largeImageURL={largeImageURL} tags={tags} onClose={closeModal} />
      )}
    </li>
  );
};
