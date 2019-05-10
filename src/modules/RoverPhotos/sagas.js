// Реализуйте саги
import { takeEvery, select, put, call, fork } from 'redux-saga/effects';
import {
  fetchPhotosRequest,
  fetchPhotosSuccess,
  fetchPhotosFailure
} from './actions';
import { getPhotos } from './api';
import { getApiKey } from '../Auth';

function* fetchPhotosWorker() {
  yield takeEvery(fetchPhotosRequest.toString(), fetchPhotos);
}

export function* fetchPhotos(action) {
	const { name, sol } = action.payload;
  try {
    const apiKey = yield select(getApiKey);
    const response = yield call(getPhotos, apiKey, name, sol);
    yield put(fetchPhotosSuccess({ photos: response.photos, name, sol }));
  } catch {
    yield put(fetchPhotosFailure({ name, sol }));
  }
}

export default function*() {
  yield fork(fetchPhotosWorker);
}
