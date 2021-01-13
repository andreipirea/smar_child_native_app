import 'react-native-gesture-handler';
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppNavigator from "./navigation/AppNavigator";

import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import guessWordReducer from './store/reducers/GuessWord';

const rootReducer = combineReducers({
  guessWordReducer: guessWordReducer
});

const store = createStore(rootReducer);

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
