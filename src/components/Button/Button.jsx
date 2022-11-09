import PropTypes from 'prop-types';
import { Container, MoreBtn } from './Button.styled';

const Button = ({ onClick }) => {
  return (
    <Container>
      <MoreBtn type="button" onClick={onClick}>
        Load more
      </MoreBtn>
    </Container>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
