// Actions
const SET_GUIDES = "guides/SET_GUIDES";
const SET_LANGUAGE = "guides/SET_LANGUAGE";
const SET_GENDER = "guides/SET_GENDER";

// Initial state
const INITIAL_STATE = {
  list: [],
  selectedLanguage: null,
  selectedGender: null,
};

// Reducer
export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SET_GUIDES:
      return {
        ...state,
        list: action.payload
      };
    case SET_LANGUAGE:
      return {
        ...state,
        selectedLanguage: action.payload
      };
    case SET_GENDER:
      return {
        ...state,
        selectedGender: action.payload
      };
    default:
      return state;
  }
}

// Actions
export function setGuides(payload) {
  return dispatch => {
    dispatch({
      type: SET_GUIDES,
      payload
    });
  };
}

export function setLanguage(payload) {
  return dispatch => {
    dispatch({
      type: SET_LANGUAGE,
      payload
    });
  };
}

export function setGender(payload) {
  return dispatch => {
    dispatch({
      type: SET_GENDER,
      payload
    });
  };
}
