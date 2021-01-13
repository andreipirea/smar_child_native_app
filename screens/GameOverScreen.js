import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
// import BodyText from "../components/BodyText";
// import TitleText from "../components/TitleText";
import Colors from "../constants/colors";
import MainButton from "../components/MainButton";
import { useSelector } from "react-redux";


const GameOverScreen = (props) => {
  const word = useSelector((state) => state.guessWordReducer.word);


  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.screen}>
        <Text style={styles.congratsText}>FELICITĂRI!!!</Text>
        <View style={styles.imageContainer}>
          <Image
            fadeDuration={1000}
            source={require("../assets/images/success.png")}
            // source={{uri: 'https://cdn.pixabay.com/photo/2020/05/20/06/47/mountain-5195052__340.jpg'}}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            Ai câștigat!{"\n"}Ai reușit să ghicești cuvântul <Text style={styles.highlight}>{word.toUpperCase()}</Text>
          </Text>
        </View>
        <MainButton
          style={styles.buttton}
          onPress={() => {
            props.navigation.navigate("GameFieldsScreen");
          }}
        >
          Mai încearcă o dată
        </MainButton>
        <MainButton
          style={styles.buttton}
          onPress={() => {
            props.navigation.navigate("HomeScreen");
          }}
        >
          Nu acum
        </MainButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    height: "100%",
    justifyContent: "center",

  },
  screen: {
    flex: 1,
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#ffff80",
  },
  congratsText: {
    fontSize: 20,
    color: Colors.accent
  },
  imageContainer: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    borderRadius: (Dimensions.get("window").width * 0.7) / 2,
    borderWidth: 3,
    borderColor: "#ffff66",
    overflow: "hidden",
    // marginVertical: Dimensions.get("window").height / 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  resultContainer: {
    marginHorizontal: 40,
    marginVertical: Dimensions.get("window").height / 60,
  },
  resultText: {
    textAlign: "center",
    fontSize: Dimensions.get("window").height < 400 ? 16 : 20,
  },
  highlight: {
    color: Colors.primary,
  },
  buttton:{
    marginVertical: 20
  }
});

export default GameOverScreen;
