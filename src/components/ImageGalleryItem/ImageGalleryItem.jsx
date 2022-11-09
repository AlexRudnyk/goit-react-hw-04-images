// import PropTypes from 'prop-types';
import { Component } from 'react';
import Modal from 'components/Modal';
import { Item, Image } from './ImageGalleryItem.styled';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal } = this.state;
    const { webFormat, alt, largeImage } = this.props;
    return (
      <>
        <Item onClick={this.toggleModal}>
          <Image src={webFormat} alt={alt} loading="lazy" />
        </Item>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <Image src={largeImage} alt={alt} loading="lazy" />
          </Modal>
        )}
      </>
    );
  }
}

// ImageGalleryItem.propTypes = {
//   photoArray: PropTypes.arrayOf(PropTypes.shape({})),
// };

export default ImageGalleryItem;
