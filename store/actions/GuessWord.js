export const GUESS_WORD = 'GUESS_WORD';
export const DECREMENT_ROUNDS = 'DECREMENT_ROUNDS';

export const guessWordAction = (word, letters, clue, rounds) => {
  return {
    type: GUESS_WORD,
    gameSetup: {word, letters, clue, rounds}
  };
};

export const decrementRoundsAction = () => {
  return {
    type: DECREMENT_ROUNDS,
  }
}