import { takeLatest, select, put, call, fork } from 'redux-saga/effects';
import { fetchRequest, fetchSuccess, fetchFailure } from './actions';
import { getApiKey } from '../Auth/reducer';
import { getFollowersInfo } from './api';

function* fetchFollowersWatcher() {
  yield takeLatest(fetchRequest.toString(), fetchFollowersFlow); // Замените вопросительный знак на подходящий экшен
}

export function* fetchFollowersFlow(action) {
  // Реализуйте загрузку данных
  // Используйте экшены FETCH_SUCCESS / FETCH_FAILURE
  try {
    const apiKey = yield select(getApiKey);
    const response = yield call(getFollowersInfo, apiKey, action.payload);
    yield put(fetchSuccess(response));
  } catch {
    yield put(fetchFailure());
  }
}

export default function*() {
  yield fork(fetchFollowersWatcher);
}
