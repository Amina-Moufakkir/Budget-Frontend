import React, { useState, useContext, useCallback } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

const BudgetContext = React.createContext();
//GlobalContext

export const ContextProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  const addIncome = async (income) => {
    try {
      const response = await axios.post(`${API}income`, income);
      getIncomes();
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const getIncomes = useCallback(async () => {
    try {
      const response = await axios.get(`${API}income`);
      setIncomes(response.data.data);
    } catch (error) {
      setError('Server Error');
    }
  }, []);

  const updateIncome = useCallback(
    async (id, updatedIncome) => {
      try {
        const response = await axios.put(`${API}income/${id}`, updatedIncome);
        getIncomes();
      } catch (error) {
        setError('Server Error');
      }
    },
    [getIncomes]
  );

  const deleteIncome = async (id) => {
    const res = await axios.delete(`${API}income/${id}`);
    getIncomes();
  };

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome = totalIncome + income.amount;
    });

    return totalIncome;
  };

  const addExpense = async (income) => {
    const response = await axios.post(`${API}expenses`, income).catch((err) => {
      setError(err.response.data.message);
    });
    getExpenses();
  };

  const getExpenses = useCallback(async () => {
    const response = await axios.get(`${API}expenses`);
    setExpenses(response.data);
    // console.log(response.data);
  }, []);

  const deleteExpense = async (id) => {
    const res = await axios.delete(`${API}expense/${id}`);
    getExpenses();
  };

  const totalExpenses = () => {
    let totalIncome = 0;
    expenses.forEach((income) => {
      totalIncome = totalIncome + income.amount;
    });

    return totalIncome;
  };

  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history.slice(0, 3);
  };

  return (
    <BudgetContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        updateIncome,
        expenses,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudgetContext = () => {
  return useContext(BudgetContext);
};
