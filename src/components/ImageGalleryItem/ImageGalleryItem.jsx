import PropTypes from 'prop-types';
import { useState } from 'react';
import Modal from 'components/Modal';
import { Item, Image } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({ webFormat, alt, largeImage }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Item onClick={toggleModal}>
        <Image src={webFormat} alt={alt} loading="lazy" />
      </Item>
      {showModal && (
        <Modal onClose={toggleModal}>
          <Image src={largeImage} alt={alt} loading="lazy" />
        </Modal>
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  photoArray: PropTypes.arrayOf(PropTypes.shape({})),
};
