import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { changeSol } from '../actions';

const current = handleActions(
  {
    [changeSol]: (state, action) => action.payload
  },
  1
);

const min = handleActions({}, 1);

const max = handleActions({}, 100);

export default combineReducers({ current, min, max });
