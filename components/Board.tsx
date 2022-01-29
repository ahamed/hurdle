import { css } from '@emotion/react';
import React, { useEffect, useRef } from 'react';
import { useGameContext } from '../hooks/useGameContext';
import Box from './Box';
import update from 'react-addons-update';
import { BoxState, ButtonStyleType, ButtonTypes, GridBox } from '../types.d';
import Button, { ButtonSize } from './Button';
import { numberOfColumns } from '../utils';

const styles = {
  wrapper: css`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 5px;

    &:focus {
      border: none;
      outline: none;
    }
  `,

  actionButtons: css`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
  `,
};

const Board = () => {
  const { grid, setGrid, currentRow, currentColumn, onHitEnter, gameLock, onResetGame } = useGameContext();

  useEffect(() => {
    document.addEventListener('keydown', insertLetterToTheCurrentBox);

    return () => {
      document.removeEventListener('keydown', insertLetterToTheCurrentBox);
    };
  }, []);

  const insertLetterToTheCurrentBox = (event: any) => {
    const letter = event.key.toUpperCase();

    if (event.metaKey) {
      if (letter === 'R') {
        onResetGame();
      }

      event.preventDefault();
      return;
    }

    if (gameLock.current) {
      return;
    }

    if (letter === 'ENTER') {
      onHitEnter();
      return;
    }

    if (letter === 'BACKSPACE') {
      setGrid((prev: GridBox[][]) => {
        if (prev[currentRow.current][currentColumn.current].letter.length === 0) {
          currentColumn.current = Math.max(0, currentColumn.current - 1);
        }

        return update(prev, {
          [currentRow.current]: {
            [currentColumn.current]: {
              $set: { letter: '', status: BoxState.default },
            },
          },
        });
      });

      return;
    }

    if (/^[A-Z]{1}$/.test(letter)) {
      setGrid((prev: GridBox[][]) => {
        if (!!prev[currentRow.current][currentColumn.current].letter.length) {
          return prev;
        }
        return update(prev, {
          [currentRow.current]: {
            [currentColumn.current]: {
              $set: { letter, status: BoxState.default },
            },
          },
        });
      });

      currentColumn.current = Math.min(currentColumn.current + 1, numberOfColumns - 1);
    }
  };

  return (
    <div>
      <div css={styles.wrapper}>
        {grid.map((row, rowIndex) =>
          row.map((letter, letterIndex) => (
            <Box key={letterIndex} content={letter} rowIndex={rowIndex} columnIndex={letterIndex} />
          )),
        )}
      </div>
    </div>
  );
};

export default Board;
