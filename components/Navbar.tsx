import { css } from '@emotion/react';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import copy from 'copy-to-clipboard';
import React from 'react';
import { FacebookShareButton } from 'react-share';
import swal from 'sweetalert';
import { useGameContext } from '../hooks/useGameContext';
import { ButtonTypes } from '../types.d';
import { generateShareMessage, isCorrectWordPredicted } from '../utils';
import Button, { ButtonSize } from './Button';

const styles = {
  navbar: css`
    width: 100%;
    padding: 10px;
    margin-bottom: 40px;
    text-transform: uppercase;
    color: #666666;
    letter-spacing: 2px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #d3d3d3;
    margin-left: 20px;

    label {
      text-transform: capitalize;
      margin-top: 10px;
      cursor: pointer;
      user-select: none;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      padding: 10px;
      border-radius: 5px;

      span {
        margin-left: 10px;
      }
    }
  `,
  settings: css`
    width: 100%;
    display: flex;
    justify-content: end;
    gap: 10px;
    align-items: center;
  `,
  shareButton: css`
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    padding: 10px;
    border-radius: 5px;
    border: none;
    outline: none;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

const Navbar = () => {
  const { showKeyboard, setShowKeyboard, grid, gameLock } = useGameContext();
  return (
    <div css={styles.navbar}>
      <h1>Hurdle</h1>
      <div css={styles.settings}>
        <button css={styles.shareButton} onClick={() => setShowKeyboard(!showKeyboard)}>
          <span>{showKeyboard ? 'Hide Keyboard' : 'Show Keyboard'}</span>
        </button>

        {gameLock.current && isCorrectWordPredicted(grid) && (
          <Button
            type={ButtonTypes.success}
            onClick={() => {
              const shareMessage = generateShareMessage(grid);
              copy(shareMessage);
              swal({
                title: 'Copied!',
                text: 'Copied to the clipboard',
                icon: 'success',
              });
            }}
          >
            Share
            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20">
              <path
                fill="#fff"
                d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"
              ></path>
            </svg>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
