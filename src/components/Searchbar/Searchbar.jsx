import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';
import { Input, Header, SearchForm, SearchBtn } from './Searchbar.styled';

const schema = yup.object().shape({
  searchInput: yup.string().min(2, 'Too short').max(50, 'Too long'),
});

const initialValues = {
  searchInput: '',
};

const Searchbar = ({ onSubmit }) => {
  const handleSubmit = ({ searchInput }, { resetForm }) => {
    onSubmit(searchInput);
    resetForm();
  };

  return (
    <Header>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <SearchForm>
          <SearchBtn type="submit">
            <ImSearch size={20} />
          </SearchBtn>

          <Input
            name="searchInput"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <ErrorMessage name="searchInput" />
        </SearchForm>
      </Formik>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
