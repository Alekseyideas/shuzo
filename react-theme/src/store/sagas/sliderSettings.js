import { call, put } from 'redux-saga/effects';
import * as actionType from '../actionTypes';
import domain from '../../config/domain';
import axios from 'axios';

function fnGetSliderSettings() {
  return axios.get( domain + '/wp-json/wp/v2/slider-settings' )
      .then(resp => {
        return resp.data;
      })
      .catch(e => e)
}

export default function* sagaGetSliderSettings() {
  try {
    const sliderSettings = yield call(fnGetSliderSettings);
    yield put({ type: actionType.GET_SLIDER_SETTINGS_SUCCESS, sliderSettings })
  } catch (e) {
    yield put({ type: actionType.GET_SLIDER_SETTINGS_ERROR, e })
  }
}

