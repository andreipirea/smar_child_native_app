import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import { addNote, editNote } from "../../store/actions/Memo";
import { Entypo } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const AddNote = (props) => {
  const [titleInput, setTitleInput] = useState("");
  const [noteInput, setNoteInput] = useState("");

  const dispatch = useDispatch();
  // const notes = useSelector((state) => state.notesReducer);

  const titleInputHandler = (title) => {
    setTitleInput(title);
  };

  const noteInputHandler = (note) => {
    setNoteInput(note);
  };

  const saveNoteHandler = () => {
    const id = props.route.params !== undefined ? props.route.params.id : null;
    
    if (id === null) {
      dispatch(addNote(Date.now().toString(), titleInput, noteInput));
      props.navigation.navigate("MemoList");
    } else {
      dispatch(editNote(id.toString(), titleInput, noteInput, false));
      props.navigation.navigate("MemoList");
    }
  };


  useEffect(() => {
    const title =
      props.route.params !== undefined ? props.route.params.title : null;
    const text =
      props.route.params !== undefined ? props.route.params.text : null;
    const id = props.route.params !== undefined ? props.route.params.id : null;
    if (id !== null) {
      setTitleInput(title);
      setNoteInput(text);
    }
  }, []);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={saveNoteHandler}
          style={{ marginRight: 15 }}
        >
          <Entypo name="save" size={24} color="orange" />
        </TouchableOpacity>
      ),
    });
  }, [titleInput, noteInput]);

  return (
    <View style={styles.mainContainer}>
      <TextInput
        placeholder="Titlu"
        value={titleInput}
        onChangeText={(e) => titleInputHandler(e)}
        style={styles.titleInput}
      />
      <TextInput
        multiline
        placeholder="Notițe"
        value={noteInput}
        onChangeText={(e) => noteInputHandler(e)}
        style={styles.noteInput}
      />
    </View>
  );
};

export const addNoteScreenOptions = () => {
  return {
    title: "Adaugă o notiță nouă",
    headerTitleAlign: "center",
    headerTintColor: "orange",
  };
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    height: "100%",
    alignItems: "center",
    paddingVertical: 10,
  },
  titleInput: {
    width: "90%",
    height: 40,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  noteInput: {
    width: "90%",
  },
});

export default AddNote;
