import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/track.svg';

import styled from 'styled-components';
import { Navbar } from '../components';

const Landing = () => {
  return (
    <>
      <Navbar />
      <Wrapper className="wrapper">
        <article className="container page">
          <div className="intro">
            <h1>
              Expense <span>Tracking</span> App
            </h1>
            <p>
              Expense Tracking Made Effortless and Enjoyable. With{' '}
              <span className="d-sign">$</span>Tracker, bid farewell to the
              complexities of expense management and welcome a smooth and
              enjoyable tracking experience.
            </p>
            <p className="accent">
              Transform Your Spending Habits with{' '}
              <span className="d-sign">$</span>Tracker.
            </p>
            <Link className="btn btn-hero" to="/register">
              Get Started
            </Link>
          </div>
          <div className="img-container">
            <img src={logo} alt="landing" className=" img img-main" />
          </div>
        </article>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.main`
  .page {
    min-height: 100vh;
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  h1 {
    color: var(--primary-color);
    font-weight: 700;
    span {
      color: var(--theme-color);
    }
  }
  p {
    color: var(--grey-600);
  }
  .accent {
    color: var(--primary-color-4);
    margin-bottom: 2rem;
  }
  .img-main {
    width: 100%;
    height: 500px;
    position: relative;
    border-radius: 20px;
    display: block;
    object-fit: cover;
  }
  .d-sign {
    color: #daa520;
    font-weight: 600;
  }

  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .img-main {
      height: 50%;
    }
  }
`;

export default Landing;
