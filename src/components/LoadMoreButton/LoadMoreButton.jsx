import PropTypes from 'prop-types';
import css from './LoadMoreButton.module.css';

export const LoadMoreButton = ({ onClick }) => (
  <button className={css.loadMoreButton} onClick={onClick} type="button">
    Load more
  </button>
);

LoadMoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
