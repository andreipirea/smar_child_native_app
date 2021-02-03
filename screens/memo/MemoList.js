import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  BackHandler,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getNotes, unCheckNotes, editNote } from "../../store/actions/Memo";

import NoteCard from "../../components/NoteCard";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import CheckBox from "@react-native-community/checkbox";

const MemoList = (props) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [checkBoxVisible, setCheckBoxVisible] = useState(false);

  const notes = useSelector((state) => state.notesReducer);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      setCheckBoxVisible(false);
      // setToggleCheckBox(false);
    }
    dispatch(getNotes());
  }, [isFocused]);

  useEffect(() => {
    if (checkBoxVisible === false) {
      dispatch(unCheckNotes());
    }
    const backButtonHandler = () => {
      if (checkBoxVisible == true) {
        setCheckBoxVisible(false);
        return true;
      } else {
        return false;
      }
    };
    BackHandler.addEventListener("hardwareBackPress", backButtonHandler);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backButtonHandler);
  }, [checkBoxVisible]);

  const Item = (itemData) => {
    return (
      <NoteCard
        onLongPress={() => {
          setCheckBoxVisible(true);
          dispatch(
            editNote(
              itemData.item.id,
              itemData.item.title,
              itemData.item.text,
              true
            )
          );
          dispatch(getNotes());
        }}
        onPress={() => {
          props.navigation.navigate("AddNote", {
            id: itemData.item.id,
            title: itemData.item.title,
            text: itemData.item.text,
          });
        }}
        title={itemData.item.title}
        text={itemData.item.text}
      >
        <CheckBox
          style={
            checkBoxVisible
              ? { display: "flex", opacity: 1 }
              : { display: "none", opacity: 0 }
          }
          disabled={false}
          value={!checkBoxVisible ? false : itemData.item.isChecked}
          onValueChange={() => {
            dispatch(
              editNote(
                itemData.item.id,
                itemData.item.title,
                itemData.item.text,
                (itemData.item.isChecked = !itemData.item.isChecked)
              )
            );
            dispatch(getNotes());
          }}
        />
      </NoteCard>
    );
  };

  if (notes.length == 0) {
    return (
      <View style={styles.mainContainerText}>
        <Text style={styles.text}>Nu ai nici o notiță!</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={notes}
        renderItem={Item}
        keyExtractor={(item) => item.id}
        numColumns={1}
      />
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    title: "Notițe",
    headerTitleAlign: "center",
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: "orange",
    },
    headerRight: () => (
      <TouchableOpacity
        onPress={() => navData.navigation.navigate("AddNote")}
        style={{ marginRight: 15 }}
      >
        <MaterialIcons name="playlist-add" size={27} color="white" />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#f2f2f2",
    alignItems: "center",
  },
  mainContainerText: {
    backgroundColor: "#f2f2f2",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 25,
    color: "#8c8c8c",
  },
});

export default MemoList;
