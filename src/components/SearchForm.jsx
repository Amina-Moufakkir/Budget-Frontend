import React, { useState, useMemo } from 'react';
import { FormRow, FormSelect } from '.';
import { useAppContext } from '../context/AppContext';

import styled from 'styled-components';

const SearchForm = () => {
  const [delaySearch, setDelaySearch] = useState('');
  const {
    isLoading,
    handleChange,
    searchTransaction,
    searchCategory,
    sort,
    sortOptions,
    transactionTypeOptions,
    categoryTypeOptions,
    clearFilters,
  } = useAppContext();

  const handleSearchTransaction = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDelaySearch('');
    clearFilters();
  };

  const debounce = () => {
    let timeoutID;
    return (e) => {
      setDelaySearch(e.target.value);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        handleChange({ name: e.target.name, value: e.target.value });
      }, 1000);
    };
  };
  const optimizedDebounce = useMemo(() => {
    debounce();
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper>
      <form className="form">
        <h4>Search Transaction</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="search"
            value={delaySearch}
            handleChange={optimizedDebounce}
          />
          <FormSelect
            labelText="Transaction name"
            name="searchTransaction"
            value={searchTransaction}
            handleChange={handleSearchTransaction}
            list={['all', ...transactionTypeOptions]}
          />
          <FormSelect
            labelText="Category"
            name="searchCategory"
            value={searchCategory}
            handleChange={handleSearchTransaction}
            list={['all', ...categoryTypeOptions]}
          />
          <FormSelect
            labelText="sort"
            name="sort"
            value={sort}
            handleChange={handleSearchTransaction}
            list={sortOptions}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form {
    width: 100%;
    max-width: 100%;
  }
  .form-input,
  .form-select,
  .btn-block {
    height: 35px;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 2rem;
    row-gap: 0.5rem;
  }
  h5 {
    font-weight: 700;
  }
  .btn-block {
    align-self: end;
    margin-top: 1rem;
  }
  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr;
    }
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .btn-block {
      margin-top: 0;
    }
  }
`;

export default SearchForm;
