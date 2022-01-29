import { css } from '@emotion/react';
import React from 'react';
import { useGameContext } from '../hooks/useGameContext';
import { BoxState, GridBox } from '../types.d';

const bgColors = {
  [BoxState.absent]: '#5c636a',
  [BoxState.wrongPosition]: '#ffdc7d',
  [BoxState.correctPosition]: '#48c78e',
  [BoxState.default]: '#f1f1f1',
};
const colors = {
  [BoxState.absent]: '#fff',
  [BoxState.wrongPosition]: '#222',
  [BoxState.correctPosition]: '#fff',
  [BoxState.default]: '#000',
};
const borderColor = {
  [BoxState.absent]: '#5c636a',
  [BoxState.wrongPosition]: '#ffdc7d',
  [BoxState.correctPosition]: '#00c4a7',
  [BoxState.default]: '#555',
};

const size = 60;

const styles = {
  wrapper: (state: BoxState = BoxState.default) => css`
    border: 1px solid ${borderColor[state]};
    border-radius: 5px;
    width: ${size}px;
    height: ${size}px;
    font-weight: 700;
    font-size: 2rem;
    font-family: Arial;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${bgColors[state]};
    color: ${colors[state]};
  `,
};

interface BoxProps {
  content: GridBox;
  rowIndex: number;
  columnIndex: number;
}

const Box = ({ content, rowIndex, columnIndex }: BoxProps) => {
  const { grid, word } = useGameContext();

  return <div css={styles.wrapper(content.status)}>{content.letter}</div>;
};

export default Box;
