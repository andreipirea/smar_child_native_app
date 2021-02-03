import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Dimensions } from "react-native";

const NoteCard = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} onLongPress={props.onLongPress} delayLongPress={props.delayLongPress} style={styles.touchableContainer}>
      <View style={styles.cardContainer}>
        <View style={styles.textContainer}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.text}>{props.text}</Text>
        </View>
        <View style={styles.checkBox}>{props.children}</View>
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
    flexDirection: "row"
  },
  textContainer: {
    flexDirection: "column"
  },
  title: {
    fontSize: 20,
  },
  text: {
    
  },
  checkBox: {
    position:"absolute",
    top: 3,
    right: 3
  }
});

export default NoteCard;
