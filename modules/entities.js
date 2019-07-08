// Actions
const SET_DRIVER = "SET_DRIVER";
const SET_GUIDE = "SET_GUIDE";
const SET_DATE = "SET_DATE";
const SET_DESTINATION = "SET_DESTINATION";
const SET_TRIP = "SET_TRIP";
const RESET_TRIP = "RESET_TRIP";
const RESET_GUIDE_DRIVER = "RESET_GUIDE_DRIVER";
const SET_BRANDS = "SET_BRANDS";
const SET_MODELS = "SET_MODELS";
const SET_TARGET = "SET_TARGET";
const RESET_TARGET = "RESET_TARGET";

// Initial state
const INITIAL_STATE = {
  list: [],
  brands: [],
  models: [],
  selectedDriver: null,
  selectedGuide: null,
  selectedDestination: null,
  selectedDate: null,
  trip: {},
  target: {}
};

// Reducer
export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SET_DRIVER:
      return {
        ...state,
        selectedDriver: action.payload
      };
    case SET_GUIDE:
      return {
        ...state,
        selectedGuide: action.payload
      };
    case SET_DESTINATION:
      return {
        ...state,
        selectedDestination: action.payload
      };
    case SET_DATE:
      return {
        ...state,
        selectedDate: action.payload
      };
    case SET_TRIP:
      return {
        ...state,
        trip: action.payload
      };
    case SET_BRANDS:
      return {
        ...state,
        brands: [...[{ id: null, name: "select" }], ...action.payload]
      };
    case SET_MODELS:
      return {
        ...state,
        models: [...[{ id: null, name: "select" }], ...action.payload]
      };
    case RESET_TRIP:
      return {
        ...state,
        trip: INITIAL_STATE.trip,
        selectedDriver: INITIAL_STATE.selectedDriver,
        selectedGuide: INITIAL_STATE.selectedGuide
      };
    case RESET_GUIDE_DRIVER:
      return {
        ...state,
        selectedDriver: INITIAL_STATE.selectedDriver,
        selectedGuide: INITIAL_STATE.selectedGuide
      };
    case SET_TARGET:
      return {
        ...state,
        target: action.payload
      };
    case RESET_TARGET:
      return {
        ...state,
        target: INITIAL_STATE.target
      };
    default:
      return state;
  }
}

export function select(payload, type) {
  return dispatch => {
    dispatch({
      type: type,
      payload
    });
  };
}

export function resetGuideAndDriver() {
  return dispatch => {
    dispatch({
      type: RESET_GUIDE_DRIVER
    });
  };
}

export function setDate(payload) {
  return dispatch => {
    dispatch({
      type: SET_DATE,
      payload
    });
  };
}

export function setDestination(payload) {
  return dispatch => {
    dispatch({
      type: SET_DESTINATION,
      payload
    });
  };
}

export function setTrip(payload) {
  return dispatch => {
    dispatch({
      type: SET_TRIP,
      payload
    });
  };
}

export function setBrands(payload) {
  return dispatch => {
    dispatch({
      type: SET_BRANDS,
      payload
    });
  };
}

export function setModels(payload) {
  return dispatch => {
    dispatch({
      type: SET_MODELS,
      payload
    });
  };
}

export function resetTrip() {
  return dispatch => {
    dispatch({
      type: RESET_TRIP
    });
  };
}

export function setTarget(payload) {
  return dispatch => {
    dispatch({
      type: SET_TARGET,
      payload
    });
  };
}

export function resetTarget() {
  return dispatch => {
    dispatch({
      type: RESET_TARGET
    });
  };
}
