import ImageGalleryItem from 'components/ImageGalleryItem';
import PropTypes from 'prop-types';
import { List } from './ImageGallery.styled';

const ImageGallery = ({ photoArray }) => {
  return (
    <div>
      <List>
        {photoArray.map(photo => {
          return (
            <ImageGalleryItem
              key={photo.id}
              webFormat={photo.webformatURL}
              alt={photo.tags}
              largeImage={photo.largeImageURL}
            />
          );
        })}
      </List>
    </div>
  );
};

ImageGallery.propTypes = {
  photoArray: PropTypes.arrayOf(PropTypes.shape({})),
};

export default ImageGallery;
