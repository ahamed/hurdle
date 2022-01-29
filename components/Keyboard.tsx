import { css } from '@emotion/react';
import React, { useRef } from 'react';
import update from 'react-addons-update';
import { useGameContext } from '../hooks/useGameContext';
import { GridBox, BoxState, ButtonTypes } from '../types.d';
import { numberOfColumns } from '../utils';
import Button, { ButtonSize } from './Button';
import Key from './Key';

const styles = {
  wrapper: css`
    display: grid;
    row-gap: 15px;
    width: 100%;
    margin-left: 20px;
    padding-top: 20px;
    border-top: 1px solid #d3d3d3;
  `,
  row: css`
    display: flex;
    gap: 15px;
    justify-content: center;
  `,
};

const Keyboard = () => {
  const {
    grid,
    setGrid,
    currentRow,
    currentColumn,
    onHitEnter,
    gameLock,
    onResetGame,
    absentCharacters,
    showKeyboard,
  } = useGameContext();

  const enterBtnRef = useRef<HTMLButtonElement>(null);

  if (!showKeyboard) {
    return null;
  }

  const handleKeyClick = async (letter: string) => {
    letter = letter.toUpperCase();

    if (gameLock.current) {
      return;
    }

    if (letter === 'BACKSPACE') {
      await setGrid((prev: GridBox[][]) => {
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
      await setGrid((prev: GridBox[][]) => {
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
    <div css={styles.wrapper}>
      <div css={styles.row}>
        <Key
          value="q"
          onClick={handleKeyClick}
          type={absentCharacters.includes('Q') ? ButtonTypes.dark : ButtonTypes.secondary}
        />
        <Key
          value="w"
          onClick={handleKeyClick}
          type={absentCharacters.includes('W') ? ButtonTypes.dark : ButtonTypes.secondary}
        />
        <Key
          value="e"
          onClick={handleKeyClick}
          type={absentCharacters.includes('E') ? ButtonTypes.dark : ButtonTypes.secondary}
        />
        <Key
          value="r"
          onClick={handleKeyClick}
          type={absentCharacters.includes('R') ? ButtonTypes.dark : ButtonTypes.secondary}
        />
        <Key
          value="t"
          onClick={handleKeyClick}
          type={absentCharacters.includes('T') ? ButtonTypes.dark : ButtonTypes.secondary}
        />
        <Key
          value="y"
          onClick={handleKeyClick}
          type={absentCharacters.includes('Y') ? ButtonTypes.dark : ButtonTypes.secondary}
        />
        <Key
          value="u"
          onClick={handleKeyClick}
          type={absentCharacters.includes('U') ? ButtonTypes.dark : ButtonTypes.secondary}
        />
        <Key
          value="i"
          onClick={handleKeyClick}
          type={absentCharacters.includes('I') ? ButtonTypes.dark : ButtonTypes.secondary}
        />
        <Key
          value="o"
          onClick={handleKeyClick}
          type={absentCharacters.includes('O') ? ButtonTypes.dark : ButtonTypes.secondary}
        />
        <Key
          value="p"
          onClick={handleKeyClick}
          type={absentCharacters.includes('P') ? ButtonTypes.dark : ButtonTypes.secondary}
        />
        <Key value="backspace" onClick={handleKeyClick}>
          &#9003;
        </Key>
      </div>
      <div css={styles.row}>
        <Key
          value="a"
          onClick={handleKeyClick}
          type={absentCharacters.includes('A') ? ButtonTypes.dark : ButtonTypes.secondary}
        />
        <Key
          value="s"
          onClick={handleKeyClick}
          type={absentCharacters.includes('S') ? ButtonTypes.dark : ButtonTypes.secondary}
        />
        <Key
          value="d"
          onClick={handleKeyClick}
          type={absentCharacters.includes('D') ? ButtonTypes.dark : ButtonTypes.secondary}
        />
        <Key
          value="f"
          onClick={handleKeyClick}
          type={absentCharacters.includes('F') ? ButtonTypes.dark : ButtonTypes.secondary}
        />
        <Key
          value="g"
          onClick={handleKeyClick}
          type={absentCharacters.includes('G') ? ButtonTypes.dark : ButtonTypes.secondary}
        />
        <Key
          value="h"
          onClick={handleKeyClick}
          type={absentCharacters.includes('H') ? ButtonTypes.dark : ButtonTypes.secondary}
        />
        <Key
          value="j"
          onClick={handleKeyClick}
          type={absentCharacters.includes('J') ? ButtonTypes.dark : ButtonTypes.secondary}
        />
        <Key
          value="k"
          onClick={handleKeyClick}
          type={absentCharacters.includes('K') ? ButtonTypes.dark : ButtonTypes.secondary}
        />
        <Key
          value="l"
          onClick={handleKeyClick}
          type={absentCharacters.includes('L') ? ButtonTypes.dark : ButtonTypes.secondary}
        />
      </div>
      <div css={styles.row}>
        <Key
          value="reset"
          onClick={() => {
            onResetGame();
            enterBtnRef.current?.focus();
          }}
          type={ButtonTypes.light}
        />
        <Key
          value="z"
          onClick={handleKeyClick}
          type={absentCharacters.includes('Z') ? ButtonTypes.dark : ButtonTypes.secondary}
        />
        <Key
          value="x"
          onClick={handleKeyClick}
          type={absentCharacters.includes('X') ? ButtonTypes.dark : ButtonTypes.secondary}
        />
        <Key
          value="c"
          onClick={handleKeyClick}
          type={absentCharacters.includes('C') ? ButtonTypes.dark : ButtonTypes.secondary}
        />
        <Key
          value="v"
          onClick={handleKeyClick}
          type={absentCharacters.includes('V') ? ButtonTypes.dark : ButtonTypes.secondary}
        />
        <Key
          value="b"
          onClick={handleKeyClick}
          type={absentCharacters.includes('B') ? ButtonTypes.dark : ButtonTypes.secondary}
        />
        <Key
          value="n"
          onClick={handleKeyClick}
          type={absentCharacters.includes('N') ? ButtonTypes.dark : ButtonTypes.secondary}
        />
        <Key
          value="m"
          onClick={handleKeyClick}
          type={absentCharacters.includes('M') ? ButtonTypes.dark : ButtonTypes.secondary}
        />

        <Button onClick={onHitEnter} type={ButtonTypes.dark} ref={enterBtnRef} size={ButtonSize.large}>
          ENTER
        </Button>
      </div>
    </div>
  );
};

export default Keyboard;
