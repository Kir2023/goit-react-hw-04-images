import React, { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ largeImageURL, tags, onClose }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div className={css.modalOverlay} onClick={handleBackdropClick}>
      <div className={css.modalImg}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
};
