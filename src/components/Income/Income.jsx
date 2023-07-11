import React, { useEffect } from 'react';

import IncomeForm from '../Form/IncomeForm';
import SingleIncome from '../SingleIncome/SingleIncome';

import './Income.css';
import { useBudgetContext } from '../../context/BudgetContext';

const Income = () => {
  const {
    addIncome,
    incomes,
    getIncomes,
    totalIncome,
    deleteIncome,
    updateIncome,
  } = useBudgetContext();

  console.log(incomes);

  useEffect(() => {
    getIncomes();
  }, [getIncomes]);

  return (
    <div className="income">
      <section className="section">
        <h2>Income</h2>
        <h3 className="total">
          Total Income: <span>${totalIncome()}</span>
        </h3>
        <div className="section-income">
          <div className="form-container">
            <IncomeForm />
          </div>
          <div className="incomes">
            {incomes &&
              incomes.map((income) => (
                <SingleIncome
                  key={income._id}
                  income={income}
                  deleteIncome={deleteIncome}
                  updateIncome={updateIncome}
                />
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Income;
