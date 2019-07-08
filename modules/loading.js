// Actions
const SET_LOADING = "SET_LOADING";

// Initial state
const INITIAL_STATE = {
  loading: false,
  errorMessage: null,
  successMessage: null
};

// Reducer
export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading,
        errorMessage: action.errorMessage,
        successMessage: action.successMessage,
      }; 
    default:
      return state;
  }
}

// Actions
export function setLoading(loading, errorMessage, successMessage) {
  //console.log('loading='+loading);
  return dispatch => {
    dispatch({
      type: SET_LOADING,
      loading: loading,
      errorMessage: errorMessage,
      successMessage: successMessage
    });
  };
}
 
