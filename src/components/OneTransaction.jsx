import React from 'react';
import { FaCalendarAlt, FaComment } from 'react-icons/fa';
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi';
import moment from 'moment';
import styled from 'styled-components';

const dateFormat = (date) => moment(date).format('MMM Do, YYYY');

const OneTransaction = ({
  name,
  amount,
  date,
  transactionType,
  description,
}) => {
  return (
    <Wrapper>
      <div>
        <h5>{name}</h5>
        <div
          className={`icon ${
            transactionType === 'Expenses' ? 'expenses' : 'income'
          }`}
        >
          <span>
            {transactionType === 'Income' ? <GiReceiveMoney /> : <GiPayMoney />}
          </span>
        </div>
      </div>
      <div className="content">
        <div className="inner-content">
          <div className="text">
            <p
              className={transactionType === 'Expenses' ? 'expenses' : 'income'}
            >
              ${amount}
            </p>
            <p>
              <FaCalendarAlt className="date" />
              {dateFormat(date)}
            </p>
            <p>
              <FaComment className="comment" />
              {description}
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  color: var(--primary-color-2);
  background: var(--backgroundColor);
  border: 2px solid #fff;
  border-radius: 20px;
  padding: 1rem;
  margin-bottom: 1rem;

  .icon {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #fff;
  }

  .icon span {
    font-size: 1.5rem;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .content h5 {
    font-size: 1.3rem;
    padding-left: 2rem;
    position: relative;
    text-transform: uppercase;
  }

  .content h5::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 0.8rem;
    height: 0.8rem;
    background: var(--color-green);
    border-radius: 50%;
  }

  .inner-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .icon-btn {
    outline: none;
    border: none;
    font-family: inherit;
    font-size: inherit;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: all 0.4s ease-in-out;
    color: var(--color-red-dark);
    background: inherit;
  }

  .text {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
  .text p {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    opacity: 0.8;
  }
  .income {
    font-size: 1.2rem;
    font-weight: bold;
    color: #e9b949;
  }

  .expenses {
    font-size: 1.2rem;
    font-weight: bold;
    color: #d66a6a;
  }

  .date {
    color: var(--primary-700);
  }

  .comment {
    color: var(--green-dark);
  }

  .actions {
  }
  .edit-btn,
  .delete-btn {
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    height: 30px;
  }
  .edit-btn {
    color: var(--green-dark);
    background: var(--green-light);
    margin-right: 0.5rem;
  }
  .delete-btn {
    color: var(--red-dark);
    background: var(--red-light);
  }
  &:hover .actions {
    visibility: visible;
  }
`;

export default OneTransaction;
