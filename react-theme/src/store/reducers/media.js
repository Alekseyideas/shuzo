import * as actionType from '../actionTypes';

const inititalState = {
  imgs: [],
  loading: true,
  error: false
};

export const getMedia = (state = inititalState, action) => {
  switch (action.type) {
    case actionType.GET_MEDIA_LOADING:
      return { ...state, loading: true };
    case actionType.GET_MEDIA_SUCCESS :
      return {
        ...state,
        loading: false,
        error: false,
        imgs: action.imgs.data
      };
    case actionType.GET_MEDIA_ERROR :
      return { ...state, error: true, loading: false};
    default:
      return state;
  }
};

