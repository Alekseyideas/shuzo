import * as actionType from '../actionTypes';

const inititalState = {
  autoplaySpeed: 3000,
  speed: 500,
  fadeIn: false,
  animation: false,
  error: false,
  loading: true
};

export const getSliderSettings = (state = inititalState, action) => {
  switch (action.type) {
    case actionType.GET_SLIDER_SETTINGS_LOADING :
      return { ...state, loading: true };
    case actionType.GET_SLIDER_SETTINGS_SUCCESS :
      return {
        ...state,
        autoplaySpeed: isNaN(Number(action.sliderSettings.autoplaySpeed)) ? state.autoplaySpeed : Number(action.sliderSettings.autoplaySpeed) * 1000,
        speed: !isNaN(Number(action.sliderSettings.speed)) ? Number(action.sliderSettings.speed) * 1000 : state.speed,
        fadeIn: Number(action.sliderSettings.fadeIn),
        animation: action.sliderSettings.animation,
        loading: false,
        error: false
      }
    case actionType.GET_SLIDER_SETTINGS_ERROR :
      return { ...state, error: true, loading: false};
    default:
      return state;
  }
}

