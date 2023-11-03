import React, { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import { Modal } from '../Modal/Modal.jsx';

export class ImageGalleryItem extends Component {
  state = {
    webformatURL: '',
    largeImageURL: '',
    tags: '',
    isShowModal: false,
  };

  toggleModal = () => {
    this.setState(({ isShowModal }) => ({ isShowModal: !isShowModal }));
  };
  render() {
    const { isShowModal } = this.state;
    const { webformatURL, largeImageURL, tags } = this.props;
    return (
      <li className={css.galleryItem}>
        <img
          src={webformatURL}
          alt={tags}
          onClick={this.toggleModal}
          className={css.imageGalleryItem}
        />
        {isShowModal && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            onClose={this.toggleModal}
          />
        )}
      </li>
    );
  }
}
