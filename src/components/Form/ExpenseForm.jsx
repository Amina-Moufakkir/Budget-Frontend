import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import './ExpenseForm.css';
import { useBudgetContext } from '../../context/BudgetContext';

const ExpenseForm = () => {
  const { addExpense, error, setError } = useBudgetContext();
  const [inputState, setInputState] = useState({
    title: '',
    amount: 0,
    date: '',
    category: '',
    description: '',
  });

  const handleChangeInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
    setError('');
  };

  const handleIncomeSubmit = (e) => {
    e.preventDefault();
    addExpense(inputState);
    setInputState({
      title: '',
      amount: '',
      date: '',
      category: '',
      description: '',
    });
  };
  const { title, amount, date, category, description } = inputState;
  return (
    <form className="form" onSubmit={handleIncomeSubmit}>
      {error && <p className="error">{error}</p>}
      <div className="input-control">
        <input
          type="text"
          name="title"
          value={title}
          placeholder="Expense"
          onChange={handleChangeInput('title')}
        />
      </div>

      <div className="input-control">
        <input
          type="number"
          name="amount"
          value={amount}
          placeholder="Enter The Amount"
          onChange={handleChangeInput('amount')}
        />
      </div>

      <div className="input-control">
        <DatePicker
          id="date"
          placeholderText="Enter A Date"
          selected={date}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => setInputState({ ...inputState, date: date })}
        />
      </div>

      <div className=" selects input-control">
        <select
          required
          id="category"
          name="category"
          value={category}
          onChange={handleChangeInput('category')}
        >
          <option value="" disabled>
            Select Option
          </option>
          <option value="education">Education</option>
          <option value="groceries">Groceries</option>
          <option value="health">Health</option>
          <option value="subscriptions">Subscriptions</option>
          <option value="takeaways">Takeaways</option>
          <option value="clothing">Clothing</option>
          <option value="travel">Travel</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="input-control">
        <textarea
          name="description"
          value={description}
          placeholder="Description"
          id="description"
          cols="30"
          rows="4"
          onChange={handleChangeInput('description')}
        ></textarea>
      </div>

      <div className="btn-submit">
        <button className="btn">Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
