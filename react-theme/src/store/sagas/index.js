import { takeLatest } from 'redux-saga/effects';
import * as actionType from '../actionTypes';
import sagaGetSliderSettings from './sliderSettings';
import sagaGetAuth from './auth';
import {sagaGetSlides, sagaDeleteSlide, sagaCreatSLide, sagaEditSlide} from './slides';
import {sagaGetMedia} from './media';


export default function* watcherSagas() {
  yield takeLatest(actionType.EDIT_SLIDE_START, sagaEditSlide);
  yield takeLatest(actionType.GET_MEDIA_LOADING, sagaGetMedia);
  yield takeLatest(actionType.CREATE_SLIDE_START, sagaCreatSLide);
  yield takeLatest(actionType.DELETE_SLIDE_START, sagaDeleteSlide);
  yield takeLatest(actionType.GET_SLIDES_LOADING, sagaGetSlides);
  yield takeLatest(actionType.GET_SLIDER_SETTINGS_LOADING, sagaGetSliderSettings);
  yield takeLatest(actionType.AUTH_LOADING, sagaGetAuth);
}
