// Реализуйте редьюсер
// Файл с тестами RoverPhotos.test.js поможет вам в этом
import { combineReducers } from 'redux';
import sol from './reducers/sol'
import photos from './reducers/photos'

export default combineReducers({sol, photos});
