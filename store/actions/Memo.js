import AsyncStorage from "@react-native-async-storage/async-storage";

export const ADD_NOTE = "ADD_NOTE";
export const GET_NOTES_FROM_STORAGE = "GET_NOTES_FROM_STORAGE";

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("note");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log("reading error", e);
  }
};

export const getNotes = (dataFromStorage) => {
  return {
    type: GET_NOTES_FROM_STORAGE,
    notes: dataFromStorage
  };
};

export const addNote = (id, title, text) => {
  return {
    type: ADD_NOTE,
    note: { id, title, text },
  };
};
