import React from 'react';
import styles from './styles.module.scss';

export interface ButtonProps
  extends Omit<
    React.HTMLProps<HTMLButtonElement>,
    'size' | 'className' | 'style' | 'type'
  > {
  type?: 'button' | 'submit' | 'reset';
}

export const Button = ({
  children,
  type = 'button',
  onClick,
  ...props
}: ButtonProps) => (
  <button className={styles.button} type={type} onClick={onClick} {...props}>
    {children}
  </button>
);
