import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import {
  fetchSearchRequest,
  fetchSearchSuccess,
  fetchSearchFailure
} from '../actions';

const isFetching = handleActions(
  {
    [fetchSearchRequest]: () => true,
    [fetchSearchSuccess]: () => false,
    [fetchSearchFailure]: () => false
  },
  false
);

const result = handleActions(
  {
    [fetchSearchRequest]: () => [],
    [fetchSearchSuccess]: (state, action) => {
      return action.payload;
    }
  },
  []
);

const error = handleActions(
  {
    [fetchSearchRequest]: () => null,
    [fetchSearchFailure]: (state, action) => action.payload
  },
  null
);

export const getIsFetching = state => state.search.isFetching;
export const getResult = state => state.search.result;
export const getError = state => state.search.error;

export default combineReducers({ isFetching, result, error });
