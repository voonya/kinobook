export enum IconName {
  EYE = 'fa-regular fa-eye',
  EYE_SLASHED = 'fa-regular fa-eye-slash',
}

export interface IconProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  name: IconName;
}
