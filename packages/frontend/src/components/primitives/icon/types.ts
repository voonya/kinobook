export enum IconName {
  EYE = 'fa-regular fa-eye',
  EYE_SLASHED = 'fa-regular fa-eye-slash',
  EYE_FILLED = 'fa-solid fa-eye',
  MAIL = 'fa-regular fa-envelope',
  TELEGRAM = 'fa-brands fa-telegram',
  EXIT = 'fa-solid fa-right-from-bracket',
  STAR = 'fa-regular fa-star',
  STAR_FILLED = 'fa-solid fa-star',
  XMARK = 'fa-solid fa-xmark',
  FILTERS = 'fa-solid fa-filter',
  LOCK = 'fa-solid fa-lock',
  LOCK_OPEN = 'fa-solid fa-lock-open',
  PENCIL = 'fa-solid fa-pencil',
  ARROW_LEFT = 'fa-solid fa-arrow-left',
  ARROW_RIGHT = 'fa-solid fa-arrow-right',
  GLASS = 'fa-solid fa-magnifying-glass',
}

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface IconProps {
  size?: IconSize;
  name: IconName;
}
