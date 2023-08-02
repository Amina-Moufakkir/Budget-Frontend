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

import { INITIAL_STATE } from './AppContext';

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values!',
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    };
  }

  if (action.type === SETUP_USER_START) {
    return { ...state, isLoading: true };
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      isAdmin: action.payload.isAdmin,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText,
    };
  }

  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...INITIAL_STATE,
      user: null,
      token: null,
      isAdmin: false,
    };
  }
  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: 'success',
      alertText: 'User Profile Updated!',
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      page: 1,
      [action.payload.name]: action.payload.value,
    };
  }
  if (action.type === HANDLE_CHANGE_DATE) {
    return {
      ...state,
      date: action.payload.date,
    };
  }
  if (action.type === CLEAR_INPUTS) {
    return {
      ...state,
      isEditing: false,
      editTransactionId: '',
      amount: 0,
      name: '',
      date: '',
      transactionType: '',
      categoryType: '',
      description: '',
    };
  }
  if (action.type === CREATE_TRANSACTION_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === CREATE_TRANSACTION_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'New Transaction Created!',
    };
  }
  if (action.type === CREATE_TRANSACTION_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  if (action.type === GET_TRANSACTION_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_TRANSACTION_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      transactions: action.payload.transactions,
      totalTransactions: action.payload.totalTransactions,
      numOfPages: action.payload.numOfPages,
    };
  }
  if (action.type === SET_EDIT_TRANSACTION) {
    const transaction = state.transactions.find(
      (transaction) => transaction._id === action.payload.id
    );
    const { _id, name, amount, transactionType, categoryType } = transaction;
    return {
      ...state,
      isEditing: true,
      editTransactionId: _id,
      name,
      amount,
      transactionType,
      categoryType,
    };
  }
  if (action.type === SET_DELETE_TRANSACTION) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_TRANSACTION_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_TRANSACTION_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Transaction Updated Successfully',
    };
  }
  if (action.type === EDIT_TRANSACTION_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }
  if (action.type === SHOW_STATS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === SHOW_STATS_SUCCESS) {
    const income = action.payload.stats.income || 0;
    const expenses = action.payload.stats.expenses || 0;
    const balance = income - expenses;
    return {
      ...state,
      isLoading: false,
      stats: action.payload.stats,
      monthlyTransactions: action.payload.monthlyTransactions,
      balance: balance,
    };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      search: '',
      searchTransaction: 'all',
      searchCategory: 'all',
      sort: 'latest',
    };
  }
  if (action.type === CHANGE_PAGE) {
    return { ...state, page: action.payload.page };
  }
  throw new Error(`no such action: ${action.type}`);
};

export default reducer;
