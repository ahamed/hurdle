declare module 'check-word';

export enum BoxState {
  absent = 'absent',
  wrongPosition = 'wrongPosition',
  correctPosition = 'correctPosition',
  default = 'default',
}

export interface GridBox {
  letter: string;
  status: BoxState;
}

export interface GameRef<T> {
  current: T;
}

export enum ButtonTypes {
  primary = 'primary',
  secondary = 'secondary',
  dark = 'dark',
  light = 'light',
  danger = 'danger',
  success = 'success',
  warning = 'warning',
  info = 'info',
  link = 'link',
}

export enum ButtonSize {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export interface ButtonStyleType {
  backgroundColor: string;
  color: string;
}

export interface SearchWord {
  word: Readonly<string>;
  attributes: Record<string, number>;
}
