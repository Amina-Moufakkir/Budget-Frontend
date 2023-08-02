import React, { useReducer, useContext } from 'react';

import reducer from './reducer';
import axios from 'axios';

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_START,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  HANDLE_CHANGE_DATE,
  CLEAR_INPUTS,
  CREATE_TRANSACTION_BEGIN,
  CREATE_TRANSACTION_SUCCESS,
  CREATE_TRANSACTION_ERROR,
  GET_TRANSACTION_BEGIN,
  GET_TRANSACTION_SUCCESS,
  SET_EDIT_TRANSACTION,
  SET_DELETE_TRANSACTION,
  EDIT_TRANSACTION_BEGIN,
  EDIT_TRANSACTION_SUCCESS,
  EDIT_TRANSACTION_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
} from './actions';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const isAdmin = localStorage.getItem('isAdmin');

const INITIAL_STATE = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  isAdmin: isAdmin,
  showSidebar: false,
  isEditing: false,
  editTransactionId: '',
  name: '',
  amount: 0,
  date: Date.now(),
  transactionTypeOptions: ['Income', 'Expenses'],
  transactionType: 'Income',
  categoryTypeOptions: [
    'Salary',
    'Food',
    'Transportation',
    'Entertainment',
    'Shopping',
    'Utilities',
    'Health',
    'Travel',
    'Education',
    'Personal',
    'Groceries',
    'Bills',
    'Other Expenses',
    'Investment',
    'Freelance',
    'Other Income',
  ],
  categoryType: 'Salary',
  description: '',
  transactions: [],
  totalTransactions: 0,
  page: 1,
  numOfPages: 1,
  stats: {},
  balance: '',
  monthlyTransactions: [],
  search: '',
  searchTransaction: 'all',
  searchCategory: 'all',
  sort: 'latest',
  sortOptions: ['lowest-amount', 'highest-amount', 'a-z', 'z-a'],
};

const API = process.env.REACT_APP_API_URL;

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  // axios custom instance setup
  const authFetch = axios.create({
    baseURL: API,
  });

  // request
  authFetch.interceptors.request.use(
    (config) => {
      config.headers['Authorization'] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // response
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        // console.log("Auth Error")
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 2000);
  };

  const addUserToLocalStorage = ({ user, token, isAdmin }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('isAdmin', isAdmin);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_START });
    try {
      const { data } = await axios.post(`${API}users/${endPoint}`, currentUser);

      const { user, token, isAdmin } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, isAdmin, alertText },
      });

      addUserToLocalStorage({ user, token, isAdmin });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error?.response?.data?.msg },
      });
    }
    clearAlert();
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch('/users/update-user', currentUser);
      const { user, token } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, token },
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };
  const handleDateChange = (date) => {
    dispatch({ type: HANDLE_CHANGE_DATE, payload: { date } });
  };

  const clearInputs = () => {
    dispatch({ type: CLEAR_INPUTS });
  };

  const createTransaction = async () => {
    dispatch({ type: CREATE_TRANSACTION_BEGIN });
    try {
      const { name, amount, date, transactionType, categoryType, description } =
        state;
      await authFetch.post(`/transactions`, {
        name,
        amount,
        date,
        transactionType,
        categoryType,
        description,
      });

      dispatch({ type: CREATE_TRANSACTION_SUCCESS });
      dispatch({ type: CLEAR_INPUTS });
    } catch (error) {
      if (error?.response?.status === 401) return;
      dispatch({
        type: CREATE_TRANSACTION_ERROR,
        payload: { msg: error?.response?.data?.msg },
      });
    }
    clearAlert();
  };

  const getAllTransactions = async () => {
    const { page, search, searchTransaction, searchCategory, sort } = state;

    let url = '/transactions';
    const config = {
      params: {
        transactionType: searchTransaction,
        categoryType: searchCategory,
        page: page,
        sort:
          sort === 'lowest-amount'
            ? 'lowest-amount'
            : sort === 'highest-amount'
            ? 'highest-amount'
            : sort,
      },
    };
    if (search) {
      config.params.search = search;
      url = url + '?' + search;
    }
    dispatch({ type: GET_TRANSACTION_BEGIN });
    try {
      const { data } = await authFetch.get(url, config);
      const { transactions, totalTransactions, numOfPages } = data;
      dispatch({
        type: GET_TRANSACTION_SUCCESS,
        payload: {
          transactions,
          totalTransactions,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const setEditTransaction = (id) => {
    dispatch({ type: SET_EDIT_TRANSACTION, payload: { id } });
  };

  const editTransaction = async () => {
    dispatch({ EDIT_TRANSACTION_BEGIN });
    try {
      const { name, amount, categoryType, transactionType, description } =
        state;

      await authFetch.patch(`/transactions/${state.editTransactionId}`, {
        name,
        amount,
        categoryType,
        transactionType,
        description,
      });
      dispatch({ type: EDIT_TRANSACTION_SUCCESS });
      dispatch({ type: CLEAR_INPUTS });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_TRANSACTION_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const setDeleteTransaction = async (transactionId) => {
    dispatch({ type: SET_DELETE_TRANSACTION });
    try {
      await authFetch.delete(`/transactions/${transactionId}`);
      getAllTransactions();
    } catch (err) {
      logoutUser();
    }
  };

  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });

    try {
      const { data } = await authFetch.get('/transactions/stats');
      console.log(data);
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyTransactions: data.monthlyTransactions,
        },
      });
    } catch (error) {
      // console.log(error.response);
      logoutUser();
    }
    clearAlert();
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        handleDateChange,
        clearInputs,
        createTransaction,
        getAllTransactions,
        setEditTransaction,
        setDeleteTransaction,
        editTransaction,
        showStats,
        clearFilters,
        changePage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, INITIAL_STATE, useAppContext };
