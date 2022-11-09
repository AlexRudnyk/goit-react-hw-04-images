import { Component } from 'react';
// import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import api from './Api/Api';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Spinner from './Spinner';

class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    photoArray: [],
    status: 'idle',
    totalHits: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    // this.simpleLightbox();
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({
        status: 'pending',
      });
      api
        .fetchPhoto(searchQuery, page)
        .then(newCards => {
          this.setState(prevState => ({
            photoArray: [...prevState.photoArray, ...newCards.hits],
            totalHits: newCards.total,
            status: 'resolved',
          }));
        })
        .catch(error =>
          this.setState({
            error,
            status: 'rejected',
          })
        );
    }
  }

  // simpleLightbox = () => {
  //   var lightbox = new SimpleLightbox('.gallery a', {});
  //   lightbox.refresh();
  // };

  handleSubmit = inputValue => {
    this.setState({
      searchQuery: inputValue,
      page: 1,
      photoArray: [],
    });
  };

  loadMorePhoto = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { status, photoArray, totalHits, page } = this.state;
    const totalPages = Math.ceil(totalHits / 12);

    if (status === 'idle') {
      return <Searchbar onSubmit={this.handleSubmit} />;
    }

    if (status === 'pending') {
      return (
        <>
          <Searchbar onSubmit={this.handleSubmit} />
          <Spinner />
        </>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <Searchbar onSubmit={this.handleSubmit} />
          <ImageGallery photoArray={photoArray} />
          {page < totalPages && <Button onClick={this.loadMorePhoto} />}
        </>
      );
    }

    if (status === 'rejected') {
      return;
    }
  }
}

export default App;
