
// Actions
const SET_LIST = "nationalities/SET_LIST";
const SET_LOADING = "nationalities/SET_LOADING";
const SET_SELECTED_ITEM = "nationalities/SET_SELECTED_ITEM";

// Initial state
const INITIAL_STATE = {
  list: [],
  date: null,
  selectedItem: null,
  loading: false,
};

// Reducer
export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SET_LIST:
      return {
        ...state,
        list: [...[{id:null, name:'select'}], ...action.payload]
      }
    case SET_SELECTED_ITEM:
      return {
        ...state,
        selectedItem: action.payload
      }
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state;
  }
};

// Actions
export function setNationalities(payload) {
  return dispatch => {
    dispatch({
      type: SET_LIST,
      payload
    })
  }
};

export function setLoading(payload) {
  return dispatch => {
    dispatch({
      type: SET_LOADING,
      payload
    })
  }
};

export function setSelectedItem(payload) {
  return dispatch => {
    dispatch({
      type: SET_SELECTED_ITEM,
      payload
    })
  }
};