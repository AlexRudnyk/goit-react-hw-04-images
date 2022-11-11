import { useState, useEffect } from 'react';
import 'simplelightbox/dist/simple-lightbox.min.css';
import api from './Api/Api';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Spinner from './Spinner';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [photoArray, setPhotoArray] = useState([]);
  const [status, setStatus] = useState('idle');
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    setStatus('pending');
    api
      .fetchPhoto(searchQuery, page)
      .then(newCards => {
        setPhotoArray(state => [...state, ...newCards.hits]);
        setTotalHits(newCards.total);
        setStatus('resolved');
      })
      .catch(error => setStatus('rejected'));
  }, [page, searchQuery]);

  const handleSubmit = inputValue => {
    setSearchQuery(inputValue);
    setPage(1);
    setPhotoArray([]);
  };

  const loadMorePhoto = () => {
    setPage(state => state + 1);
  };

  const totalPages = Math.ceil(totalHits / 12);

  if (status === 'idle') {
    return <Searchbar onSubmit={handleSubmit} />;
  }

  if (status === 'pending') {
    return (
      <>
        <Searchbar onSubmit={handleSubmit} />
        <Spinner />
      </>
    );
  }

  if (status === 'resolved') {
    return (
      <>
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery photoArray={photoArray} />
        {page < totalPages && <Button onClick={loadMorePhoto} />}
      </>
    );
  }

  if (status === 'rejected') {
    return;
  }
}
