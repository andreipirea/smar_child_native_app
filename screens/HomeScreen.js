import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import Colors from "../constants/colors";
import MainButton from "../components/MainButton";

const HomeScreen = (props) => {
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require("../assets/images/home_background.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Bine ai venit în aplicația prin care {"\n"} poți dezvolta
            cunoștințele copilului tău!
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <MainButton
            onPress={() => props.navigation.navigate("GuessGameTab")}
          >
            Să începem!
          </MainButton>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "green",
    height: "100%",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    marginBottom: 30,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 10,
  },
});

export default HomeScreen;
