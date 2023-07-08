import React from 'react';

import IncomeForm from '../Form/IncomeForm';

import './Income.css';

const Income = () => {
  return (
    <div className="income">
      <section className="section">
        <h2>Income</h2>
        <div className="form-container">
          <IncomeForm />
        </div>
        <div className="incomes"></div>
      </section>
    </div>
  );
};

export default Income;
