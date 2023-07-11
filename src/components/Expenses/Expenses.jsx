import React, { useEffect } from 'react';

import ExpenseForm from '../Form/ExpenseForm';
import SingleIncome from '../SingleIncome/SingleIncome';

import './Expenses.css';
import { useBudgetContext } from '../../context/BudgetContext';

const Expenses = () => {
  const { addExpense, expenses, getExpenses } = useBudgetContext();

  console.log(expenses);

  useEffect(() => {
    getExpenses();
  }, [getExpenses]);

  return (
    <div className="expense">
      <section className="section">
        <h2>Expense</h2>
        <h3 className="total">
          Total Income: <span>$</span>
        </h3>
        <div className="section-expense">
          <div className="form-container">
            <ExpenseForm />
          </div>
          <div className="expenses">
            {/* {expenses &&
              expenses.map((income) => (
                <SingleIncome key={income._id} income={income} />
              ))} */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Expenses;
