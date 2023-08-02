import DatePicker from 'react-datepicker';
import { useAppContext } from '../context/AppContext';
import { FormRow, FormSelect } from '.';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import { FaPlus } from 'react-icons/fa';

const TransactionForm = () => {
  const {
    isLoading,
    handleChange,
    handleDateChange,
    displayAlert,
    isEditing,
    editTransaction,
    name,
    amount,
    date,
    transactionTypeOptions,
    transactionType,
    categoryTypeOptions,
    categoryType,
    description,
    clearInputs,
    createTransaction,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !amount) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editTransaction();
      return;
    }
    createTransaction();
  };

  const handleChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    handleChange({ name, value });
  };

  const handleDateInputChange = (date) => {
    handleDateChange(date);
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <div className="input-control">
          <FormRow
            type="text"
            name="name"
            value={name}
            handleChange={handleChangeInput}
            className="input"
          />
        </div>

        <div className="input-control">
          <FormRow
            type="number"
            name="amount"
            value={amount}
            handleChange={handleChangeInput}
            className="input"
          />
        </div>

        <div className="input-control">
          <DatePicker
            id="date"
            name="date"
            placeholderText="Enter A Date"
            selected={date}
            dateFormat="dd/MM/yyyy"
            onChange={handleDateInputChange}
            className="input"
          />
        </div>

        <div className=" selects input-control">
          <FormSelect
            labelText="transaction"
            name="transactionType"
            value={transactionType}
            handleChange={handleChangeInput}
            list={transactionTypeOptions}
          />
          <FormSelect
            labelText="category"
            name="categoryType"
            value={categoryType}
            handleChange={handleChangeInput}
            list={categoryTypeOptions}
          />
        </div>
        <div className="input-control">
          <textarea
            name="description"
            value={description}
            placeholder="Description"
            id="description"
            cols="30"
            rows="4"
            onChange={handleChangeInput}
          ></textarea>
        </div>

        <div className="btn-container">
          <button className="btn btn-add" disabled={isLoading}>
            <FaPlus />
            Add
          </button>
          <button
            className="btn btn-block clear-btn"
            onClick={(e) => {
              e.preventDefault();
              clearInputs();
            }}
          >
            Clear
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background: var(--backgroundColor);
    border: 3px solid #fff;
    padding: 2rem;
    border-radius: 20px;
  }

  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.02);
    color: var(--primary-color);
  }

  input::placeholder,
  textarea::placeholder,
  select::placeholder {
    color: var(--primary-color-5);
  }

  .input-control input {
    width: 100%;
  }

  .selects {
    display: flex;
    justify-content: flex-end;
    gap: 2rem;
  }

  .selects select {
    color: var(--primary-color-5);
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: var(--green-dark);
  }
  .clear-btn:hover {
    background: var(--black);
  }
  .btn-add {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

export default TransactionForm;
