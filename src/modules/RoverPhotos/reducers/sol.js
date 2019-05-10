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

export const getCurrentSol = state => state.roverPhotos.sol.current;
export const getMinSol = state => state.roverPhotos.sol.min;
export const getMaxSol = state => state.roverPhotos.sol.max;

export default combineReducers({ current, min, max });
