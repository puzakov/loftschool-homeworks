import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import {
  fetchShowRequest,
  fetchShowSuccess,
  fetchShowFailure
} from '../actions';

const isFetching = handleActions(
  {
    [fetchShowRequest]: () => true,
    [fetchShowSuccess]: () => false,
    [fetchShowFailure]: () => false
  },
  false
);

const entities = handleActions(
  {
    [fetchShowSuccess]: (state, action) => [...state, action.payload]
  },
  []
);

export const getIsFetching = state => state.shows.isFetching;
export const getEntities = state => state.shows.entities;

export default combineReducers({ isFetching, entities });
