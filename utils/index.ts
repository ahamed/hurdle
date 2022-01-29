import { GridBox, BoxState } from './../types.d';

// @ts-ignore
import spelling from 'spelling';
// @ts-ignore
import dictionary from 'spelling/dictionaries/en_US';

export const isCorrectWordPredicted = (grid: GridBox[][]) =>
  grid.some((row) => row.every((box) => box.status === BoxState.correctPosition));

export const isGameFinished = (grid: GridBox[][]) => grid.every((row) => row.every((box) => box.letter.length > 0));

export const detectBoxState = (box: GridBox, word: string, columnIndex: number) => {
  if (box.letter === '') {
    return BoxState.default;
  }

  if (!word.includes(box.letter)) {
    return BoxState.absent;
  }

  if (word.charAt(columnIndex) === box.letter) {
    return BoxState.correctPosition;
  }

  return BoxState.wrongPosition;
};

export const numberOfRows = 6;
export const numberOfColumns = 5;

export const generateDefaultGrid = () =>
  Array.from({ length: numberOfRows }, () =>
    Array.from({ length: numberOfColumns }, () => ({ letter: '', status: BoxState.default })),
  );

const checker = new spelling(dictionary);
export const isValidEnglishWord = (word: string) => checker.lookup(word).found;

interface Symbols {
  [BoxState.absent]: string;
  [BoxState.wrongPosition]: string;
  [BoxState.correctPosition]: string;
  [BoxState.default]: string;
}

const symbols = {
  [BoxState.absent]: '⬜',
  [BoxState.wrongPosition]: '🟨',
  [BoxState.correctPosition]: '🟩',
  [BoxState.default]: '',
};

export const generateShareMessage = (grid: GridBox[][]) => {
  let steps = 1;

  for (let i = 0; i < grid.length; i++) {
    if (grid[i].every((box) => box.letter.length === 0)) {
      steps = i;
      break;
    }
  }

  let message = 'HURDLE\n';
  message += `Solved in steps ${steps} of ${numberOfRows}\n\n\n`;
  message += grid
    .map((row) =>
      row
        .map((box) => symbols[box.status])
        .filter((box) => !!box)
        .join(' '),
    )
    .join('\n');

  return message;
};
