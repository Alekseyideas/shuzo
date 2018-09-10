import { combineReducers } from 'redux';
import { getSlides } from './slides';
import { getMedia } from './media';
import { getSliderSettings } from './sliderSettings';
import { getAuth } from './auth';
import { mainController } from './mainController';

export const rootReducer = combineReducers({
  mainController,
  getSlides,
  getSliderSettings,
  getAuth,
  getMedia
});

