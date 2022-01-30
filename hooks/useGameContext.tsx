import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import update from 'react-addons-update';
import swal from 'sweetalert';

import { getRandomWord, getSearchingWord } from '../data/words';
import { BoxState, GameRef, GridBox, SearchWord } from '../types.d';
import {
  detectBoxState,
  generateDefaultGrid,
  isCorrectWordPredicted,
  isGameFinished,
  isValidEnglishWord,
  numberOfColumns,
  numberOfRows,
  updateBoxStates,
} from '../utils';
import { useGameWord } from './useGameWord';

export const gridDefault = generateDefaultGrid();

interface ContextProps {
  grid: GridBox[][];
  setGrid: (value: any) => void;
  currentRow: GameRef<number>;
  currentColumn: GameRef<number>;
  gameLock: GameRef<boolean>;
  hurdle: GameRef<SearchWord>;
  onHitEnter: () => void;
  onResetGame: () => void;
  absentCharacters: string[];
  setAbsentCharacters: (value: string[]) => void;
  showKeyboard: boolean;
  setShowKeyboard: (value: any) => void;
}

const GameContext = createContext<ContextProps>({
  grid: gridDefault,
  setGrid: (value) => {},
  currentRow: { current: 0 },
  currentColumn: { current: 0 },
  gameLock: { current: false },
  hurdle: { current: { word: '', attributes: {} } },
  onHitEnter: () => {},
  onResetGame: () => {},
  absentCharacters: [],
  setAbsentCharacters: (value) => {},
  showKeyboard: true,
  setShowKeyboard: (value) => {},
});

interface GameContextProvideProps {
  children: React.ReactNode;
}

export const word = getSearchingWord();

export const GameContextProvider = ({ children }: GameContextProvideProps) => {
  const [grid, setGrid] = useState<GridBox[][]>(gridDefault);
  const [absentCharacters, setAbsentCharacters] = useState<string[]>([]);
  const [showKeyboard, setShowKeyboard] = useState<boolean>(true);

  const hurdle = useRef<SearchWord>(word);
  const gameLock = useRef(false);
  const currentRow = useRef(0);
  const currentColumn = useRef(0);

  console.log(hurdle.current);

  useEffect(() => {
    if (currentRow.current > 0 && currentColumn.current === 0) {
      const absents = grid.flatMap((row) => {
        return row
          .filter((box) => box.status === BoxState.absent)
          .map((box) => box.letter)
          .filter((letter, index, array) => array.indexOf(letter) === index);
      });

      setAbsentCharacters(absents);

      if (isCorrectWordPredicted(grid)) {
        gameLock.current = true;
      }
    }

    if (currentRow.current === numberOfRows - 1 && currentColumn.current === 0) {
      if (isGameFinished(grid)) {
        gameLock.current = true;
      }
    }

    if (gameLock.current) {
      if (isCorrectWordPredicted(grid)) {
        swal({
          title: 'Congratulations!',
          text: `You have found the word "${hurdle.current.word}"`,
          icon: 'success',
        });
      } else {
        swal({
          title: 'Game Over!',
          text: `You are not able to find the word!`,
          icon: 'error',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(grid)]);

  const handleHitEnter = async () => {
    let isValid = true;

    if (currentColumn.current >= numberOfColumns - 1) {
      await setGrid((prev) => {
        const insertedWord = prev[currentRow.current].map((box) => box.letter).join('');
        isValid = isValidEnglishWord(insertedWord);

        if (!isValid) {
          return prev;
        }

        return update(prev, { $set: updateBoxStates(prev, currentRow.current, hurdle) });
      });

      currentRow.current = Math.min(currentRow.current + 1, numberOfRows - 1);
      currentColumn.current = 0;
    }

    if (!isValid) {
      swal({
        title: 'Opps!',
        text: `The word you've inserted is not valid English word!`,
        icon: 'error',
      });

      currentRow.current--;
      currentColumn.current = numberOfColumns - 1;
    }
  };

  const handleResetGame = () => {
    hurdle.current = getSearchingWord();
    setGrid(generateDefaultGrid());
    currentRow.current = 0;
    currentColumn.current = 0;
    gameLock.current = false;
  };

  const value = useMemo<ContextProps>(
    () => ({
      grid,
      setGrid,
      hurdle,
      currentRow: currentRow,
      currentColumn: currentColumn,
      onHitEnter: handleHitEnter,
      onResetGame: handleResetGame,
      gameLock,
      absentCharacters,
      setAbsentCharacters,
      showKeyboard,
      setShowKeyboard,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(grid), currentRow, currentColumn, absentCharacters, showKeyboard, hurdle],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGameContext = () => useContext(GameContext);
