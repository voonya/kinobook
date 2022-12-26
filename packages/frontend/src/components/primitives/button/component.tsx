import React from 'react';
import styles from './styles.module.scss';

export interface ButtonProps
  extends Omit<
    React.HTMLProps<HTMLButtonElement>,
    'size' | 'className' | 'style' | 'type'
  > {
  type?: 'button' | 'submit' | 'reset';
  color?: 'primary' | 'secondary' | 'danger';
  size?: 'xs' | 'md' | 'lg';
}

export const Button = ({
  children,
  type = 'button',
  color = 'primary',
  size = 'md',
  onClick,
  ...props
}: ButtonProps) => (
  <button
    className={styles.button}
    data-sizevar={size}
    type={type}
    onClick={onClick}
    data-color={color}
    {...props}
  >
    {children}
  </button>
);
