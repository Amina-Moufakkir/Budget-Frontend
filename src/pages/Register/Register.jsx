import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

import styled from 'styled-components';

import Alert from '../../components/Alert';
import { Logo, FormRow } from '..';

const Register = () => {
  const { user, isLoading, showAlert, displayAlert, setupUser } =
    useAppContext();

  const navigate = useNavigate();

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isMember: true,
  });
  const { firstName, lastName, email, password, isMember } = values;

  const toggleMember = () => {
    setValues({ ...values, isMember: !isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (
      !email ||
      !password ||
      (!isMember && !firstName) ||
      (!isMember && !lastName)
    ) {
      displayAlert();
      return;
    }
    const currentUser = { firstName, lastName, email, password };
    if (isMember) {
      setupUser({
        currentUser,
        endPoint: 'login',
        alertText: 'Login successful!',
      });
    } else {
      setupUser({
        currentUser,
        endPoint: 'register',
        alertText: 'Account successfully created',
      });
    }
  };
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }
  }, [user, navigate]);

  return (
    <Wrapper>
      <form onSubmit={onSubmitHandler} className="form">
        <Logo />
        <h3>{isMember ? 'Login' : 'Register'}</h3>
        {showAlert && <Alert />}
        {!isMember && (
          <>
            <FormRow
              type="text"
              name="firstName"
              value={firstName}
              handleChange={handleChange}
              labelText="First Name"
            />

            <FormRow
              type="text"
              name="lastName"
              value={lastName}
              handleChange={handleChange}
              labelText="Last Name"
            />
          </>
        )}

        <FormRow
          type="email"
          name="email"
          value={email}
          handleChange={handleChange}
          labelText="Email"
        />

        <FormRow
          type="password"
          name="password"
          value={password}
          handleChange={handleChange}
        />

        <button className=" btn btn-block" type="submit" disabled={isLoading}>
          Submit
        </button>
        <p>
          {isMember ? 'Don’t have an account?' : 'Already have an account?'}
          <button className="member-btn" onClick={toggleMember}>
            {isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10rem;

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--theme-color);
  }
  h3 {
    text-align: center;
    letter-spacing: var(--letterSpacing);
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .btn-block {
    height: 35px;
    width: 100%;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-700);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
`;

export default Register;
