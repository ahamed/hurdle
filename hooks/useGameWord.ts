import { useMemo } from 'react';
import { getRandomWord } from '../data/words';

export const useGameWord = () => {
  return useMemo(() => {
    const word = getRandomWord();
    const attributes = word.split('').reduce((attrs: Record<string, number>, char: string) => {
      attrs[char] ||= 0;
      attrs[char]++;
      return attrs;
    }, {});

    return {
      word,
      attributes,
    };
  }, []);
};
