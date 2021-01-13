import React, {useState, createContext, useContext} from 'react';

export const WordContext = createContext();
export const useWordContext = useContext(WordContext);

export const WordProvider = ({children}) => {

  const [_word, _setWord] = useState('');
  const [_clue, _setClue] = useState('');
  const [_numberOfRounds, _setNumberOfRounds] = useState(null);

  return (
    <WordContext.Provider value={{
      newWord: {
        value: _word,
        updateValue: _setWord
      },
      newClue: {
        value: _clue,
        updateValue: _setClue
      },
      newNumberOfRounds: {
        value: _numberOfRounds,
        updateValue: _setNumberOfRounds
      }
    }}>
      {children}
    </WordContext.Provider>
  );
};