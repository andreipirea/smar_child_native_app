import { ADD_NOTE, GET_NOTES_FROM_STORAGE } from "../actions/Memo";
import NoteModel from "../../content/NoteModel";

const initialState = [];

export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTES_FROM_STORAGE:
      state = action.notes;
      return state;
    case ADD_NOTE:
      const note = new NoteModel(action.note.id, action.note.title, action.note.text);
      return [note, ...state];
    default:
      return state;
  }
};