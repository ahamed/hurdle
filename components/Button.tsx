import { css } from '@emotion/react';
import React from 'react';
import { buttonStyles } from '../data/buttonStyles';
import { ButtonStyleType, ButtonTypes } from '../types.d';

export enum ButtonSize {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

const buttonSizePaddings = {
  [ButtonSize.small]: '6px 8px',
  [ButtonSize.medium]: '10px',
  [ButtonSize.large]: '14px 20px',
};
const buttonSizeFontSize = {
  [ButtonSize.small]: '10px',
  [ButtonSize.medium]: '12px',
  [ButtonSize.large]: '18px',
};

const styles = {
  button: (type: ButtonTypes, size: ButtonSize) => css`
    padding: ${buttonSizePaddings[size]};
    background: ${buttonStyles[type].backgroundColor};
    color: ${buttonStyles[type].color};
    font-size: ${buttonSizeFontSize[size]};
    border: 1px solid ${buttonStyles[type].backgroundColor};
    border-radius: 5px;
    letter-spacing: 2px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: ButtonTypes;
  size?: ButtonSize;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, onClick, type = ButtonTypes.primary, size = ButtonSize.medium }, ref) => {
    return (
      <button type="button" onClick={onClick} css={styles.button(type, size)} ref={ref}>
        {children}
      </button>
    );
  },
);

export default Button;
