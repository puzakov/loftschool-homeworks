import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import {
  fetchPhotosRequest,
  fetchPhotosSuccess,
  fetchPhotosFailure
} from '../actions';

function reducerMap(rover) {
  return {
    [fetchPhotosRequest]: (state, { payload: { name, sol } }) => {
      if (rover !== name) return state;
      return {
        ...state,
        [sol]: { photos: [], isLoaded: false, isLoading: true }
      };
    },
    [fetchPhotosSuccess]: (state, { payload: { name, sol, photos } }) => {
      if (rover !== name) return state;
      return {
        ...state,
        [sol]: { photos: photos, isLoaded: true, isLoading: false }
      };
    },
    [fetchPhotosFailure]: (state, { payload: { name, sol } }) => {
      if (rover !== name) return state;
      return {
        ...state,
        [sol]: { ...state[sol], isLoaded: false, isLoading: false }
      };
    }
  };
}

export const getRovers = state => state.roverPhotos.photos;

export default combineReducers({
  curiosity: handleActions({ ...reducerMap('curiosity') }, {}),
  opportunity: handleActions({ ...reducerMap('opportunity') }, {}),
  spirit: handleActions({ ...reducerMap('spirit') }, {})
});
