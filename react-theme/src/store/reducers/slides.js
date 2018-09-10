import * as actionType from '../actionTypes';

const initialStateSlides = {
  slides: [],
  loading: true,
  error: false,
  slide: {}
};

export function getSlides(state = initialStateSlides, action) {
  switch (action.type) {
    case actionType.GET_SLIDES_LOADING :
      return { ...state, loading: true };
    case actionType.GET_SLIDES_SUCCESS :
      return { ...state, slides: action.slides, loading: false};
    case actionType.GET_SLIDES_ERROR :
      return { ...state, error: true};
    case actionType.DELETE_SLIDE_SUCCESS : {
      const newState = { ...state };
      const newSlides = newState.slides.filter(slide => {
        if (slide.id !== action.id) {
          return slide
        }else {
          return null;
        }
      });
      return { newState, slides: newSlides }
    }
    case actionType.CREATE_SLIDE_SUCCESS : {
      const newState = { ...state };
      const slide = action.slide.data;
      newState.slides.push(slide);
      return { ...newState, slides: newState.slides }
    }
    case actionType.EDIT_SLIDE_SUCCESS : {
      const newSate = { ...state };
      const slide = newSate.slides.filter(slide => {
        return action.slide.data.id === slide.id ? slide : null;
      });
      newSate.slide = slide[0];
      const { title, content,better_featured_image } = action.slide.data;
      newSate.slide.title.rendered = title.raw;
      newSate.slide.content.rendered = content.raw;
      newSate.slide.better_featured_image = better_featured_image;
      return { ...newSate };
    }
    default :
      return state;
  }
}