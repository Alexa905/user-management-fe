import Loading from 'react-bootstrap/Spinner';
import { SpinnerContainer } from './Spinner.styled';

function Spinner() {
  return (
    <SpinnerContainer>
      <Loading animation="grow" />
    </SpinnerContainer>
  );
}

export default Spinner;
