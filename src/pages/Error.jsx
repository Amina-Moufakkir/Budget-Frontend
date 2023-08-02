import { Link } from 'react-router-dom';
import styled from 'styled-components';
import error from '../assets/error.svg';

const Error = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={error} alt="not found" />
        <h3>We're Sorry! Page Not Found</h3>
        <p>Something Went Wrong!</p>
        <Link to="/" className="back-link">
          back home
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  text-align: center;
  img {
    width: 90vw;
    max-width: 600px;
    display: block;
    margin-bottom: 2rem;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  h3 {
    margin-bottom: 0.5rem;
    letter-spacing: 0.2rem;
  }
  p {
    margin-top: 0;
    margin-bottom: 1rem;
    color: var(--primary-color-5);
    letter-spacing: 0.2rem;
  }
  a {
    color: var(--theme-color);
    text-decoration: underline;
    text-transform: capitalize;
  }
`;
export default Error;
