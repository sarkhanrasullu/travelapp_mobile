import { createStore, combineReducers, applyMiddleware } from 'redux';
import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';
import destinations from './destinations';
import languages from './languages';
import trips from './trips';
import drivers from './drivers';
import guides from './guides';
import loading from './loading';
import entities from './entities';
import nationalities from './nationalities';
 import auth from './auth';
 import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
  key: 'root',  
  storage: AsyncStorage
}

const middlewares = [thunk];

const authReducer = persistReducer(persistConfig, auth);

const store = createStore(
  combineReducers({
    destinations: destinations,
    languages: languages,
    trips: trips,
    drivers: drivers,
    guides: guides,
    loading: loading,
    entities: entities,
    nationalities: nationalities,
    auth: authReducer,//persisted
  }),
  applyMiddleware(...middlewares)
);

export default store;

export const persistor = persistStore(store);