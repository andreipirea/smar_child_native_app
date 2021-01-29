import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Dimensions } from "react-native";

const NoteCard = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.touchableContainer}>
      <View style={styles.cardContainer}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableContainer: {
    width: Dimensions.get("window").width - 20,
    height: 100,
    marginVertical: 10,
    overflow: "hidden",
    backgroundColor: "white",
  },
  cardContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    height: "90%",
    overflow: "hidden",

  },
  title: {
    fontSize: 20,
  },
  text: {
    
  },
});

export default NoteCard;
