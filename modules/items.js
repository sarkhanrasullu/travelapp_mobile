
// Actions
let SET_LIST = "SET_LIST";
let SET_DATE = "SET_DATE";
let SET_SELECTED_ITEM = "SET_SELECTED_ITEM";

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
        list: action.payload
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
    default:
      return state;
  }
};

// Actions
export function setList(payload) {
  return dispatch => {
    dispatch({
      type: SET_LIST,
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