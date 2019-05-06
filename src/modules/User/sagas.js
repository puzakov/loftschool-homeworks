import { takeLatest, select, put, call, fork } from 'redux-saga/effects';
import { fetchRequest, fetchSuccess, fetchFailure } from './actions';
import { getUserInfo } from './api';
import { getApiKey } from '../Auth/reducer';

function* fetchUserWatcher() {
  yield takeLatest(fetchRequest.toString(), fetchUserFlow);
}

export function* fetchUserFlow(action) {
  try {
    const apiKey = yield select(getApiKey);
    const response = yield call(getUserInfo, apiKey, action.payload);
    yield put(fetchSuccess(response));
  } catch {
    yield put(fetchFailure());
  }
}

export default function*() {
  yield fork(fetchUserWatcher);
}
