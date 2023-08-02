import React, { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import styled from 'styled-components';
import { OneTransaction, TransactionForm, Alert, PageContainer } from '.';

const Transaction = () => {
  const {
    showAlert,
    isEditing,
    getAllTransactions,
    transactions,
    stats,
    page,
    numOfPages,
  } = useAppContext();

  useEffect(() => {
    getAllTransactions();
    // eslint-disable-next-line
  }, [page]);
  return (
    <Wrapper>
      <div className="container">
        <h2>{isEditing ? 'Edit Transaction' : 'Add Transaction'}</h2>
        {showAlert && <Alert />}
        <div className="total">
          <h3>
            Balance: <span>${stats.balance}</span>
          </h3>
        </div>

        <div className="section-transaction">
          <div className="form-container">
            <TransactionForm />
          </div>
          <div className="transactions">
            {transactions &&
              transactions.map((transaction) => (
                <OneTransaction key={transaction._id} {...transaction} />
              ))}
          </div>
        </div>
      </div>
      {numOfPages > 1 && <PageContainer />}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow: auto;
  h2 {
    color: var(--primary-color-3);
    margin-bottom: 1rem;
    letter-spacing: var(--spacing);
  }

  @media (min-width: 992px) {
    .container {
      grid-template-columns: auto 1fr;
    }
  }

  .section-transaction {
    display: flex;
    gap: 2rem;
  }

  @media (max-width: 992px) {
    .section-transaction {
      flex-direction: column;
    }
    .form-container {
      order: 1;
    }
    .transactions {
      order: 2;
    }
  }

  .transactions {
    flex: 1;
  }

  .total {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: var(--primary-color);
    border: 2px solid #ffffff;
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;
    color: var(--primary-color-3);
    letter-spacing: var(--spacing);
    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-green);
    }
    h3 {
      color: #dbeafe;
    }
  }
`;

export default Transaction;
