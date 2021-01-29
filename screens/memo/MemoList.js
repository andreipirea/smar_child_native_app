import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getNotes } from "../../store/actions/Memo";

import NoteCard from "../../components/NoteCard";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';


const MemoList = (props) => {
  const notes = useSelector((state) => state.notesReducer);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const storeAndGetData = async () => {
    let notesToString = notes.length !== 0 ? JSON.stringify(notes) : [];
    try {
      // store data
      await AsyncStorage.setItem('notes', notesToString);
      console.log("store data", notesToString);

      // get data
      const jsonValue = await AsyncStorage.getItem('notes');
      console.log("get data", jsonValue != null ? JSON.parse(jsonValue) : []);
      return dispatch(getNotes(jsonValue != null ? JSON.parse(jsonValue) : []));

    } catch (e) {
      console.log("error storing", e);
    }
  };

  // const getDataFromStorage = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem('notes');
  //     console.log("get data", jsonValue != null ? JSON.parse(jsonValue) : null);
  //     return dispatch(getNotes(jsonValue != null ? JSON.parse(jsonValue) : null));
  //   } catch(e) {
  //     console.log("error getting data", e);
  //   }
  // };

  
  useEffect(() => {
    storeAndGetData();
    // getDataFromStorage();
  }, [isFocused]);
   
  

  const Item = (itemData) => {
    return (
      <NoteCard
        onPress={() =>
          props.navigation.navigate("AddNote", {
            id: itemData.item.id,
            title: itemData.item.title,
            text: itemData.item.text,
          })
        }
        title={itemData.item.title}
        text={itemData.item.text}
      />
    );
  };

  if (notes.length === 0) {
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
