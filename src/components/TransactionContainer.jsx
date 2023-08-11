import React, { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Loading, PageContainer } from '.';
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import moment from 'moment';
import styled from 'styled-components';

const TransactionContainer = () => {
  const {
    getAllTransactions,
    transactions,
    totalTransactions,
    isLoading,
    setEditTransaction,
    setDeleteTransaction,
    search,
    searchTransaction,
    searchCategory,
    sort,
    page,
    numOfPages,
  } = useAppContext();
  const dateFormat = (date) => moment(date).format('MMM Do, YYYY');

  useEffect(() => {
    getAllTransactions();
    // eslint-disable-next-line
  }, [page, search, searchTransaction, searchCategory, sort]);

  if (isLoading) {
    return <Loading center />;
  }
  if (transactions.length === 0) {
    return (
      <Wrapper>
        <h2>No transactions to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalTransactions} transaction{transactions.length > 1 && 's'} found
      </h5>
      <div className="transaction">
        {/* {transactions &&
          transactions.map((transaction) => (
            <OneTransaction key={transaction._id} {...transaction} />
          ))} */}
        <table className="table">
          <thead>
            <tr>
              <th>Transaction</th>
              <th>Name</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th className="expand">Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>
                  <div
                    className="main-icon"
                    style={{
                      backgroundColor:
                        transaction.transactionType === 'Expenses'
                          ? '#d66a6a'
                          : '#e9b949',
                    }}
                  >
                    {transaction.transactionType === 'Expenses' ? (
                      <GiPayMoney />
                    ) : (
                      <GiReceiveMoney />
                    )}
                  </div>
                </td>
                <td className="name">{transaction.name}</td>
                <td>{transaction.categoryType}</td>
                <td
                  className={
                    transaction.transactionType === 'Expenses'
                      ? 'expenses'
                      : 'income'
                  }
                >
                  ${transaction.amount}
                </td>
                <td>{dateFormat(transaction.date)}</td>
                <td>{transaction.description}</td>
                <td>
                  <Link
                    to="/dashboard/add-transactions"
                    className="btn edit-btn"
                    onClick={() => setEditTransaction(transaction._id)}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn delete-btn"
                    onClick={() => setDeleteTransaction(transaction._id)}
                  >
                    remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {numOfPages > 1 && <PageContainer />}
    </Wrapper>
  );
};
const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  .transaction table {
    margin: 0 auto;
  }
  ${
    '' /* @media (min-width: 992px) {
    .transaction {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  } */
  }
  .main-icon {
    width: 40px;
    height: 40px;
    display: grid;
    place-items: center;
    border-radius: var(--borderRadius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 2rem;
  }
  .info {
    h5 {
      margin-bottom: 0.25rem;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      letter-spacing: var(--letterSpacing);
    }
  }
  .income {
    width: fit-content;
    padding: 0.2rem;
    border-radius: var(--borderRadius);
    ${'' /* background: #fcefc7; */}
    color: #e9b949;
  }

  .expenses {
    width: fit-content;
    padding: 0.2rem;
    border-radius: var(--borderRadius);
    color: #d66a6a;
  }
  .content {
    padding: 1rem 1.5rem;
  }
  .content-center {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 992px) {
      grid-template-columns: 1fr;
    }
    @media (min-width: 1120px) {
      grid-template-columns: 1fr 1fr;
    }
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
  .name {
    text-transform: capitalize;
  }
`;

export default TransactionContainer;
