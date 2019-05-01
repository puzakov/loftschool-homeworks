// Реализуйте showMiddleware

// Вам необходимо обработать showRequest
// После получения данных с сервера - диспачте showSuccess
// В случае ошибки showSuccess

// На забудьте вызвать метод next.
import {
  fetchShowRequest,
  fetchShowSuccess,
  fetchShowFailure
} from '../actions';
import { show } from '../api';

export default store => next => action => {
  console.log(action);

  if (action.type === fetchShowRequest.toString()) {
    show(action.payload)
      .then(data => {
        store.dispatch(fetchShowSuccess(data));
      })
      .catch(error => {
        store.dispatch(fetchShowFailure(error));
      });
  }
  return next(action);
};
