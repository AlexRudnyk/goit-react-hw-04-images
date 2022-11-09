import { MutatingDots } from 'react-loader-spinner';
import { Wrapper } from './Spinner.styled';

const Spinner = () => {
  return (
    <Wrapper>
      <MutatingDots />
    </Wrapper>
  );
};

export default Spinner;
