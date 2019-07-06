// Actions
const LOGIN = "Spots/guides/LOGIN";

// Initial state
const INITIAL_STATE = {
  loggedInUser: null
};

// Reducer
export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggedInUser: action.payload
      }; 
    default:
      return state;
  }
}

// Actions
export function setLoggedInUser(payload) {
  return dispatch => {
    dispatch({
      type: LOGIN,
      payload
    });
  };
}
 
