
// Actions
const SET_LIST = "languages/SET_LIST";
const SET_LOADING = "languages/SET_LOADING";
const SET_DATE = "languages/SET_DATE";
const SET_SELECTED_ITEM = "languages/SET_SELECTED_ITEM";

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
    case SET_LIST:{
      return {
        ...state,
        list: [...[{id:null, name:'select'}], ...action.payload]
      }
    }
      case SET_DATE:
        return {
          ...state,
          date: action.payload
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
export function setLanguages(payload) {
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

export function setDate(payload) {
  return dispatch => {
    dispatch({
      type: SET_DATE,
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