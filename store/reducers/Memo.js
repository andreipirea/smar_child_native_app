import { ADD_NOTE, EDIT_NOTE, GET_NOTES_FROM_STORAGE, UNCHECK_NOTES, storeStateLocal } from "../actions/Memo";
import NoteModel from "../../content/NoteModel";

const initialState = [];

export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTES_FROM_STORAGE:
      state = action.notes;
      return state;
    case ADD_NOTE:
      const note = new NoteModel(
        action.note.id,
        action.note.title,
        action.note.text,
        false
      );
      const newState = [note, ...state];
      state = newState;
      storeStateLocal(state);
      return state;
    case EDIT_NOTE:
      const editedElement = state.find((e) => e.id == action.editedNote.id);
      const elementIndex = state.indexOf(editedElement);
      const newElement = new NoteModel(
        action.editedNote.id,
        action.editedNote.title,
        action.editedNote.text,
        action.editedNote.isChecked
      );
      state[elementIndex] = newElement;
      storeStateLocal(state);
      return state;
    case UNCHECK_NOTES:
      state.forEach(e => {
        if (e.isChecked === true) {
          e.isChecked = false;
        }

      });
      storeStateLocal(state);
      return state;
    default:
      return state;
  }
};
