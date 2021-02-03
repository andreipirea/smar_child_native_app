// import React from "react";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ADD_NOTE = "ADD_NOTE";
export const GET_NOTES_FROM_STORAGE = "GET_NOTES_FROM_STORAGE";
export const EDIT_NOTE = "EDIT_NOTE";
export const UNCHECK_NOTES = "UNCHECK_NOTES";

// const notes = useSelector((state) => state.notesReducer);

export const storeStateLocal = async (notes) => {
  try {
    await AsyncStorage.setItem("notes", JSON.stringify(notes));
  } catch (error) {
    console.log("data not stored", error);
  }
};

export const getNotes = () => {
  return async (dispatch) => {
    try {
      const jsonValue = await AsyncStorage.getItem("notes");

      dispatch({
        type: GET_NOTES_FROM_STORAGE,
        notes: JSON.parse(jsonValue),
      });
      console.log("get notes", JSON.stringify(jsonValue));
    } catch (e) {
      console.log("error storing", e);
    }
  };
};

export const addNote = (id, title, text) => {
  return {
    type: ADD_NOTE,
    note: { id, title, text },
  };
};

export const editNote = (id, title, text, isChecked) => {
  return {
    type: EDIT_NOTE,
    editedNote: { id, title, text, isChecked },
  };
};

export const unCheckNotes = () => {
  return {
    type: UNCHECK_NOTES
  }
};
