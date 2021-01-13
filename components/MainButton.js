import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Colors from "../constants/colors";

const MainButton = props => {
  return (
    <View style={{...styles.buttonContainer, ...props.style}}>
      <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{props.children}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer:{
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: 'rgba(0, 0, 0, 1)',
    // shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 25 ,
    shadowOffset : { width: 3, height: 13},
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    
  },
  buttonText: {
    color: "white",
    // fontFamily: "open-sans",
    fontSize: 18,
    fontWeight: "bold"
  },
});

export default MainButton;