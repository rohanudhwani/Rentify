// reducers.js

import { UPDATE_FILTERS } from './actions';

const initialState = {
  filters: {
    type: null,
    price: null,
    distance: null,
    bedroom: null,
    washroom: null,
  },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FILTERS:
      return {
        ...state,
        filters: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
