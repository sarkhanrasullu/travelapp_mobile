
// Actions
const SET_TRIPS = "SET_TRIPS";

// Initial state
const INITIAL_STATE = {
  list: [],
};

// Reducer
export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SET_TRIPS:
      return {
        ...state,
        list: action.payload
      }
    default:
      return state;
  }
};

// Actions
export function setTrips(payload) {
  return dispatch => {
    dispatch({
      type: SET_TRIPS,
      payload
    })
  }
};