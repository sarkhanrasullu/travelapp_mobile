
// Actions
const SET_DRIVERS = "SET_DRIVERS";

// Initial state
const INITIAL_STATE = {
  list: [],
};

// Reducer
export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SET_DRIVERS:
      return {
        ...state,
        list: action.payload
      }
    default:
      return state;
  }
};

// Actions
export function setDrivers(payload) {
  return dispatch => {
    dispatch({
      type: SET_DRIVERS,
      payload
    })
  }
};
