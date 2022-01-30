import { css } from '@emotion/react';
import { Switch } from '@mui/material';
import type { NextPage } from 'next';
import Board from '../components/Board';
import Box from '../components/Box';
import Button, { ButtonSize } from '../components/Button';
import Keyboard from '../components/Keyboard';
import Navbar from '../components/Navbar';
import { GameContextProvider, useGameContext } from '../hooks/useGameContext';
import { ButtonTypes, BoxState } from '../types.d';
import { numberOfColumns, numberOfRows } from '../utils';

const styles = {
  wrapper: css`
    width: 100vw;
    height: 100vh;
    z-index: 1;
    display: grid;
    grid-template-columns: 3fr 1fr;
    row-gap: 20px;
    align-items: center;
    column-gap: 40px;
    height: 100vh;
    backdrop-filter: blur(1000px);

    @media (max-width: 992px) {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr;
    }
  `,

  main: css`
    height: 100%;
    width: 100%;
  `,

  informationSidebar: css`
    height: 100vh;
    overflow: auto;
    border-left: 1px solid #d3d3d3;
    padding: 20px;
    line-height: 26px;

    @media (max-width: 768px) {
      margin-top: 100px;
    }

    h2 {
      margin-bottom: 10px;
    }
    p {
      margin-top: 20px;
    }
  `,

  boardWrapper: css`
    display: grid;
    justify-content: center;
    align-items: center;
  `,

  rules: css`
    margin-top: 20px;
    margin-left: 20px;

    li {
      margin-bottom: 10px;
      width: 100%;
      padding: 10px 5px;
    }
  `,
  exampleBox: css`
    display: flex;
    gap: 5px;
    margin-bottom: 5px;
    & > div {
      width: 40px;
      height: 40px;
    }
  `,

  keyboardWrapper: css`
    margin-top: 40px;
    display: flex;
    justify-content: center;
  `,
};

const Home: NextPage = () => {
  return (
    <GameContextProvider>
      <div css={styles.wrapper}>
        <div css={styles.main}>
          <Navbar />
          <div css={styles.boardWrapper}>
            <Board></Board>
          </div>
          <div css={styles.keyboardWrapper}>
            <Keyboard />
          </div>
        </div>

        <div css={styles.informationSidebar}>
          <h2>Rules</h2>
          <hr />
          <p>
            Guess a word in {numberOfRows} tries. Each guess must be a valid ${numberOfColumns} characters word. After
            each word guess hit <strong>Enter</strong> key of the keyboard or click the{' '}
            <span style={{ display: 'inline' }}>
              <Button type={ButtonTypes.dark} size={ButtonSize.small}>
                Enter
              </Button>
            </span>{' '}
            button.
          </p>

          <h4>In one guess-</h4>
          <ol css={styles.rules}>
            <li>
              If any character matched with the searching word on the <b>correct position</b> then it shows in green
              background.<h4 style={{ margin: '10px 0 5px 0' }}>For Example:</h4>
              <div css={styles.exampleBox}>
                {['W', 'O', 'R', 'L', 'D'].map((char, index) => (
                  <Box
                    key={index}
                    content={{
                      letter: char,
                      status: index === 0 ? BoxState.correctPosition : BoxState.default,
                    }}
                  />
                ))}
              </div>
              Here the <b>W</b> is in the word and in correct position.
            </li>
            <li>
              If any character is in the searching word but <b>not in correct position</b>, then it shows in yellow
              background. <h4 style={{ margin: '10px 0 5px 0' }}>For Example:</h4>
              <div css={styles.exampleBox}>
                {['B', 'O', 'A', 'R', 'D'].map((char, index) => (
                  <Box
                    key={index}
                    content={{
                      letter: char,
                      status: index === 3 ? BoxState.wrongPosition : BoxState.default,
                    }}
                  />
                ))}
              </div>
              Here the <b>R</b> is in the word but in wrong position.
            </li>
            <li>
              If any character is not in the searching word, then it shows in grey background.{' '}
              <h4 style={{ margin: '10px 0 5px 0' }}>For Example:</h4>
              <div css={styles.exampleBox}>
                {['C', 'O', 'U', 'L', 'D'].map((char, index) => (
                  <Box
                    key={index}
                    content={{
                      letter: char,
                      status: index === 2 ? BoxState.absent : BoxState.default,
                    }}
                  />
                ))}
              </div>
              Here the <b>U</b> is absent in the searching word.
            </li>
          </ol>
        </div>
      </div>
    </GameContextProvider>
  );
};

export default Home;
