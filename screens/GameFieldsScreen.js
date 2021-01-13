import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  ImageBackground,
  Alert
} from "react-native";
import MainButton from "../components/MainButton";

import { useDispatch } from "react-redux";
import { guessWordAction } from "../store/actions/GuessWord";

const GameFieldsScreen = (props) => {
  const [wordField, setWordField] = useState("");
  const [lettersField, setLettersField] = useState("");
  const [clueField, setClueField] = useState("");
  const [roundsField, setRoundsField] = useState(null);

  const dispatch = useDispatch();

  const wordInputHandler = (word) => {
    setWordField(word);
  };

  const lettersInputHandler = letters => {
    setLettersField(letters);
  };

  const clueInputHandler = (clue) => {
    setClueField(clue);
  };

  const roundsInputHandler = (round) => {
    setRoundsField(round);
  };

  const startGameHandler = () => {
    if ((wordField.split("").every((letter) => lettersField.split("").includes(letter))) && wordField !== '') {
      Alert.alert(
        "Încerci să mă păcălești?",
        "Dacă afișezi toate literele existente în cuvânt jocul nu mai poate fi jucat.",
        [{ text: "Bine", style: "cancel" }]
      );
      return;
    }

    if(wordField === '') {
      return;
    }
    dispatch(guessWordAction(wordField, lettersField, clueField, roundsField));
    props.navigation.navigate("PlayGameScreen");
    setWordField("");
    setLettersField("");
    setClueField("");
    setRoundsField(null);
  };


  return (
    <ImageBackground
      source={require("../assets/images/fields_screen.png")}
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.mainContainer}>
          <Text style={styles.wordInputLabel}>
            Alege un cuvant pe care copilul tău va trebui sa-l ghicească
          </Text>
          <TextInput
            style={styles.wordInput}
            placeholder={"Alege un cuvant"}
            value={wordField}
            onChangeText={(e) => wordInputHandler(e)}
          />
          <Text style={styles.wordInputLabel}>
            Alege literele care vrei sa fie afișate
          </Text>
          <TextInput
            style={styles.wordInput}
            placeholder={"abc..."}
            value={lettersField}
            onChangeText={(e) => lettersInputHandler(e)}
          />
          <Text style={styles.wordInputLabel}>
            Daca vrei poți sa alegi un indiciu care sa-l ajute
          </Text>
          <TextInput
            style={styles.wordInput}
            placeholder={"Alege un indiciu"}
            value={clueField}
            onChangeText={(e) => clueInputHandler(e)}
          />
          <Text style={styles.wordInputLabel}>
            De asemenea, daca vrei, poți sa alegi și numărul de încercari
          </Text>
          <TextInput
            style={styles.numberInput}
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            value={roundsField}
            onChangeText={(e) => roundsInputHandler(e)}
          />
          {
            <MainButton
              style={wordField !== '' ? styles.button : {...styles.button, opacity: 0.6}}
              onPress={startGameHandler}
            >
              Start!
            </MainButton>
          }
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "center",
  },
  scrollView: {
    // alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  wordInputLabel: {
    textAlign: 'center',
    color: "white",
    marginBottom: 10,
    marginTop: 30,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 10,
  },
  wordInput: {
    width: "80%",
    height: 40,
    textAlign: "center",
    backgroundColor: "rgba(225, 225, 225, 0.9)",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
  },
  numberInput: {
    width: "10%",
    height: 40,
    textAlign: "center",
    backgroundColor: "rgba(225, 225, 225, 0.9)",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
  },
  button: {
    marginTop: 10,
  },
});

export default GameFieldsScreen;
