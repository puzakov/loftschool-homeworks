import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { fetchRequest, fetchSuccess, fetchFailure } from './actions';

// Обратите внимание на тесты, они помогут вам написать код редьюсера
const isLoading = handleActions(
  {
    [fetchRequest]: () => true,
    [fetchSuccess]: () => false,
    [fetchFailure]: () => false
  },
  false
);

const data = handleActions(
  {
    [fetchSuccess]: (state, action) => action.payload,
    [fetchFailure]: () => null
  },
  null
);

export const getIsLoading = state => state.user.isLoading;
export const getData = state => state.user.data;

export default combineReducers({ isLoading, data });
