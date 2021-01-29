import "react-native-gesture-handler";
import React from "react";
import { StyleSheet } from "react-native";
import AppNavigator from "./navigation/AppNavigator";

import { Provider } from "react-redux";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import ReduxThunk from 'redux-thunk';

import guessWordReducer from "./store/reducers/GuessWord";
import {notesReducer} from "./store/reducers/Memo";

const rootReducer = combineReducers({
  guessWordReducer: guessWordReducer,
  notesReducer: notesReducer,
});

let composeEnhancers = compose;

if(__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(rootReducer, compose(applyMiddleware(ReduxThunk), composeEnhancers()));

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
