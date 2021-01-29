import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { decrementRoundsAction } from "../../store/actions/GuessWord";

const PlayGameScreen = (props) => {
  const [unknownWord, setUnknownWord] = useState([]);
  const [usedLetterIndex, setUsedLetterIndex] = useState([]);
  const dispatch = useDispatch();
  const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "Ș",
    "T",
    "Ț",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "Ă",
    "Â",
    "Î",
  ];

  const word = useSelector((state) => state.guessWordReducer.word);
  const letters = useSelector((state) => state.guessWordReducer.letters);
  const clue = useSelector((state) => state.guessWordReducer.clue);
  const rounds = useSelector((state) => state.guessWordReducer.rounds);

  let wordArr = word.toUpperCase().split("");
  let dashArray = [];
  let lettersArr = letters.toUpperCase().split("");
  let newUnknownWord = unknownWord;
  const failedColor = { backgroundColor: "#ff4d4d" };
  const successColor = { backgroundColor: "#00b300" };

  useEffect(() => {
    setUnknownWord(newUnknownWord);
    for (let e = 0; e < wordArr.length; e++) {
      dashArray.push("_");
    }

    wordArr.forEach((letter, index) => {
      lettersArr.forEach((item, i) => {
        if (letter === item) {
          dashArray[index] = letter;
        }
      });
    });

    alphabet.forEach((letter, index) => {
      lettersArr.forEach((item) => {
        if (letter === item && wordArr.includes(letter)) {
          usedLetterIndex.push(index);
        }
      });
    });

    setUnknownWord(dashArray);
  }, []);

  useEffect(() => {
    if (unknownWord.join("") == word.toUpperCase()) {
      props.navigation.navigate("GameOverScreen");
    }
  }, [unknownWord]);

  const letterHandler = (el, i) => {
    if (!wordArr.includes(el)) {
      dispatch(decrementRoundsAction());
      if (rounds !== null && (rounds == 1 || rounds < 2)) {
        props.navigation.navigate("LostGameScreen");
        return;
      }
    }
    usedLetterIndex.push(i);
    wordArr.forEach((item, index) => {
      if (item === el) {
        newUnknownWord[index] = el;
      }
    });

    setUnknownWord([...newUnknownWord]);
  };

  return (
    <ImageBackground
      source={require("../../assets/images/play_game.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.mainContainer}>
        <View style={styles.unknownWordContainer}>
          <Text style={styles.unknownWord}>{unknownWord.join("  ")}</Text>
        </View>
        {rounds !== null && rounds !== "" && (
          <View style={styles.roundsContainer}>
            <Text style={styles.text}>
              Ai <Text style={styles.redText}>{rounds}</Text>{" "}
              {rounds === 1 ? "încercare" : "încercări"}!
            </Text>
          </View>
        )}
        {clue !== "" && (
          <View style={styles.clueContainer}>
            <Text style={styles.text}>
              Indiciul tău este: <Text style={styles.blueText}>{clue}</Text>
            </Text>
          </View>
        )}
        <View style={styles.lettersContainer}>
          {alphabet.map((letter, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  if (usedLetterIndex.includes(index)) {
                    return;
                  } else {
                    letterHandler(letter, index);
                  }
                }}
              >
                <View
                  style={
                    usedLetterIndex.includes(index)
                      ? wordArr.includes(letter)
                        ? { ...styles.letterContainer, ...successColor }
                        : { ...styles.letterContainer, ...failedColor }
                      : styles.letterContainer
                  }
                >
                  <Text style={styles.letter}>{letter}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  mainContainer: {
    // flex: 1,
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  unknownWordContainer: {
    // flex: 1,
    marginVertical: "15%",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "80%",
    // height: "50%",
  },
  unknownWord: {
    color: "white",
    fontSize: 30,
  },
  roundsContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "80%",
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  redText: {
    color: "red",
    fontSize: 25,
  },
  blueText: {
    color: "blue",
    fontSize: 25,
  },
  clueContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "80%",
  },
  lettersContainer: {
    // flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    // height: "50%",
  },
  letterContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
    backgroundColor: "green",
    borderWidth: 1,
    borderColor: "#006600",
    borderRadius: 10,
    marginVertical: 2,
    marginHorizontal: 1,
  },
  letter: {
    textAlign: "center",
    color: "white",
  },
});

export default PlayGameScreen;
