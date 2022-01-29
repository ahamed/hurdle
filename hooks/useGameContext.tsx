import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import update from 'react-addons-update';
import swal from 'sweetalert';

import { getRandomWord } from '../data/words';
import { BoxState, GameRef, GridBox } from '../types.d';
import {
  detectBoxState,
  generateDefaultGrid,
  isCorrectWordPredicted,
  isGameFinished,
  isValidEnglishWord,
  numberOfColumns,
  numberOfRows,
} from '../utils';
import { useGameWord } from './useGameWord';

export const gridDefault = generateDefaultGrid();

interface ContextProps {
  grid: GridBox[][];
  setGrid: (value: any) => void;
  currentRow: GameRef<number>;
  currentColumn: GameRef<number>;
  gameLock: GameRef<boolean>;
  word: string;
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
  word: '',
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

export const GameContextProvider = ({ children }: GameContextProvideProps) => {
  const word = useGameWord();

  const [grid, setGrid] = useState<GridBox[][]>(gridDefault);
  const [absentCharacters, setAbsentCharacters] = useState<string[]>([]);
  const [showKeyboard, setShowKeyboard] = useState<boolean>(true);

  const gameLock = useRef(false);
  const currentRow = useRef(0);
  const currentColumn = useRef(0);

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
          text: `You have found the word ${word}`,
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
  }, [grid]);

  const handleHitEnter = async () => {
    let isValid = true;

    if (currentColumn.current >= numberOfColumns - 1) {
      await setGrid((prev) => {
        const insertedWord = prev[currentRow.current].map((box) => box.letter).join('');
        isValid = isValidEnglishWord(insertedWord);

        if (!isValid) {
          return prev;
        }

        return update(prev, {
          [currentRow.current]: {
            $set: prev[currentRow.current].map((box, index) => ({
              ...box,
              status: detectBoxState(box, word, index),
            })),
          },
        });
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
    setGrid(generateDefaultGrid());
    currentRow.current = 0;
    currentColumn.current = 0;
    gameLock.current = false;
  };

  const value = useMemo<ContextProps>(
    () => ({
      grid,
      setGrid,
      word: getRandomWord(),
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
    [JSON.stringify(grid), currentRow, currentColumn, absentCharacters, showKeyboard],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGameContext = () => useContext(GameContext);
