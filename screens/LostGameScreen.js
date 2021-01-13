import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MainButton from '../components/MainButton';
import {useSelector} from 'react-redux';

const LostGameScreen = props => {
  const word = useSelector((state) => state.guessWordReducer.word);



  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Cuvântul pe care îl cauți este: <Text style={styles.word}>{word}</Text>{"\n"}{"\n"} Nu-i nimic!</Text>
      <MainButton
        style={styles.buttton}
        onPress={() => {props.navigation.navigate("GameFieldsScreen")}}
      >
        Mai încearcă o dată
      </MainButton>
      <MainButton
        style={styles.buttton}
        onPress={() => {props.navigation.navigate("HomeScreen")}}
      >
        Nu acum
      </MainButton>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#d4edda",
    height: '100%'
  },
  title: {
    textAlign: 'center',
    fontSize: 25
  },
  word: {
    color: 'red'
  },
  buttton:{
    marginVertical: 20
  }
});

export default LostGameScreen;