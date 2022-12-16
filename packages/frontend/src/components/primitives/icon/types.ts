export enum IconName {
  EYE = 'fa-regular fa-eye',
  EYE_SLASHED = 'fa-regular fa-eye-slash',
  MAIL = 'fa-regular fa-envelope',
  TELEGRAM = 'fa-brands fa-telegram',
  EXIT = 'fa-solid fa-right-from-bracket',
  STAR = 'fa star fix it',
}

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface IconProps {
  size?: IconSize;
  name: IconName;
}
