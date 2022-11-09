import type { IconProps } from './types';

const Icon = ({ name, size = 'sm' }: IconProps) => (
  <i className={`${name} fa-${size}`}></i>
);

export { Icon };
