import { call, put } from 'redux-saga/effects';
import * as actionType from '../actionTypes';
import domain from '../../config/domain';
import axios from 'axios';

function fnGetImgs () {
  return axios.get(domain + '/wp-json/wp/v2/media')
      .then(data => data)
      .catch(e=>console.log(e));
}

export function* sagaGetMedia() {
    try {
      const imgs = yield call(fnGetImgs);
      yield put({ type: actionType.GET_MEDIA_SUCCESS, imgs })
    }catch (e) {
      return e
    }
}