import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import './IncomeForm.css';

const IncomeForm = () => {
  const [inputState, setInputState] = useState({
    title: '',
    amount: 0,
    date: '',
    category: '',
    description: '',
  });

  const handleChangeInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
  };

  const handleIncomeSubmit = (e) => {
    e.preventDefault();
  };
  const { title, amount, date, category, description } = inputState;
  return (
    <form className="form" onSubmit={handleIncomeSubmit}>
      <div className="input-control">
        <input
          type="text"
          name="title"
          value={title}
          placeholder="Enter Your Salary"
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
          <option value="salary">Salary</option>
          <option value="investment">Investment</option>
          <option value="freelance">Freelance</option>
          <option value="rental">Rental</option>
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
        <button className="btn">Add Income</button>
      </div>
    </form>
  );
};

export default IncomeForm;
