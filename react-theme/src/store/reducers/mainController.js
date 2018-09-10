import * as actionType from '../actionTypes';

const initialState = {
  control: true
};

export function mainController(state=initialState, action) {
  switch (action.type) {
    case actionType.CONTROL_TOGGLE: {
      return { ...state, control: !state.control }
    }
    default :
      return state;
  }

}