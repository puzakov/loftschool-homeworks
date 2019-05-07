// Реализуйте редьюсер
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { addKey } from './actions';

const apiKey = handleActions(
  {
    [addKey]: (state, action) => action.payload
  },
  ''
);

export const getIsAuthorized = state => !!state.auth.apiKey;
export const getApiKey = state => state.auth.apiKey;

export default combineReducers({ apiKey });
