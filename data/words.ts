// Array of english words exactly 5 characters long
const words = [
  'could',
  'first',
  'world',
  'hello',
  'human',
  'third',
  'woman',
  'child',
  'touch',
  'magic',
  'small',
  'early',
  'cliff',
  'treat',
  'night',
  'fight',
  'light',
  'might',
  'sight',
  'watch',
  'image',
  'water',
  'paper',
  'color',
  'space',
  'black',
  'white',
  'brown',
  'apple',
  'phone',
  'music',
  'river',
  'place',
  'point',
  'house',
  'power',
  'later',
  'baker',
  'money',
  'story',
  'young',
  'south',
  'force',
  'heart',
  'sugar',
  'shame',
  'fault',
  'guilt',
  'silly',
  'candy',
  'cough',
  'lemon',
  'juice',
  'three',
]
  .filter((word) => word.length === 5)
  .filter((word, index, array) => array.indexOf(word) === index)
  .map((word) => word.toUpperCase());

export const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

export const getSearchingWord = () => {
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
};

export default words;
