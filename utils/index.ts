import { GridBox, BoxState, SearchWord, GameRef } from './../types.d';
// @ts-ignore
import spelling from 'spelling';
// @ts-ignore
import dictionary from 'spelling/dictionaries/en_US';

export const isCorrectWordPredicted = (grid: GridBox[][]) =>
  grid.some((row) => row.every((box) => box.status === BoxState.correctPosition));

export const isGameFinished = (grid: GridBox[][]) => grid.every((row) => row.every((box) => box.letter.length > 0));

export const updateBoxStates = (grid: GridBox[][], rowIndex: number, hurdle: GameRef<SearchWord>) => {
  const _grid = [...grid];
  const _row = [..._grid[rowIndex]];
  const _attributes = { ...hurdle.current.attributes };
  const letters = hurdle.current.word;

  _row.forEach((box, index) => {
    if (!!_attributes[box.letter]) {
      if (letters.charAt(index) === box.letter) {
        _attributes[box.letter] = Math.max(0, _attributes[box.letter] - 1);
        box.status = BoxState.correctPosition;
      }
    }
  });

  _row.forEach((box) => {
    if (!!_attributes[box.letter] && box.status !== BoxState.correctPosition) {
      _attributes[box.letter] = Math.max(0, _attributes[box.letter] - 1);
      box.status = BoxState.wrongPosition;
    }
  });

  _row.forEach((box) => {
    if (box.status === BoxState.default) {
      box.status = BoxState.absent;
    }
  });

  _grid[rowIndex] = _row;

  return _grid;
};

export const detectBoxState = (box: GridBox, columnIndex: number, hurdle: GameRef<SearchWord>) => {
  const { word: letters } = hurdle.current;

  if (hurdle.current.attributes[box.letter] > 0) {
    hurdle.current.attributes[box.letter]--;
    return letters.charAt(columnIndex) === box.letter ? BoxState.correctPosition : BoxState.wrongPosition;
  }

  return BoxState.absent;
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
  message += `Solved in ${steps} of ${numberOfRows} steps.\n\n`;
  message += grid
    .map((row) =>
      row
        .map((box) => symbols[box.status])
        .filter((box) => !!box)
        .join(' '),
    )
    .join('\n');

  message += '#hurdlewordlegame';

  return message;
};
