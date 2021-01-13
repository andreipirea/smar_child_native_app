import { DECREMENT_ROUNDS, GUESS_WORD } from "../actions/GuessWord";

const initialState = {
  word: '',
  letters: '',
  clue: '',
  rounds: null
};

const guessWordReducer = (state = initialState, action) => {
  switch (action.type) {
    case GUESS_WORD: 
      return {...state, ...action.gameSetup}

    case DECREMENT_ROUNDS:
      if (state.rounds !== null && state.rounds !== '' && state.rounds > 0) {
        state.rounds--
      }
        return {...state}
    default:
      return state;
  }
};

export default guessWordReducer;