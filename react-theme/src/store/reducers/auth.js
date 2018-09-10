import * as actionType from '../actionTypes';
import {token} from '../../config/token';

const initialState= {
  auth: typeof token === 'string',
  token: typeof token === 'string' ? token : null,
  loading: typeof token !== 'string',
  error: false
};

export function getAuth(state = initialState, action) {
  switch (action.type) {
    case actionType.AUTH_LOADING :
      return { ...state, loading: true, auth: false };
    case actionType.AUTH_SUCCESS :
      return { ...state, loading: false, auth: true, token: action.authSettings };
    case actionType.AUTH_ERROR :
      return { ...state, loading: false, auth: false, error: true };
    default :
      return state;
  }
}