import { call, put } from 'redux-saga/effects';
import * as actionType from '../actionTypes';
import domain from '../../config/domain';
import axios from 'axios';

function getAuth() {
  return axios(domain + '/wp-json/jwt-auth/v1/token',{
    method: 'POST',
    data:{
      username: 'admin',
      password: 'Ym1OU0Ukp6NQ'
    }
  }).then(user => {
    localStorage.setItem('token', JSON.stringify(user.data.token));
    return user.data.token;
  }).catch(error => console.log('Error in getAuth function:', error))
}


export default function* sagaGetAuth() {
  try {
    const authSettings = yield call(getAuth);
    yield put({ type: actionType.AUTH_SUCCESS, authSettings })
  } catch (e) {
    yield put({ type: actionType.AUTH_ERROR, e })
  }
}