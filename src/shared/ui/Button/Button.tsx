import { ElementType, MouseEvent } from 'react';

import { clsx } from 'clsx';
import styles from './Button.module.scss';
import { Typography } from '../Typography';
import { PolymorphicComponentProp } from '../generics';
import { Component } from '../Component';

export enum ButtonSize {
  SMALL = 's',
  MEDIUM = 'm',
  LARGE = 'l',
}

type ButtonSizeUnion = `${ButtonSize}`;

export enum ButtonMode {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

type ButtonModeUnion = `${ButtonMode}`;

export type ButtonProps<C extends ElementType> = PolymorphicComponentProp<C, {
  size?: ButtonSize | ButtonSizeUnion;
  mode?: ButtonMode | ButtonModeUnion;
  stretched?: boolean;
}>;

export const Button = <C extends ElementType>({
  className, size = 'm', mode = 'primary', stretched, children, disabled, onClick: onClickProp, as = 'button' as C, ...rest
}: ButtonProps<C>) => {
  const rootClassName = clsx(
    className,
    styles.Button,
    styles[`Button_size_${size}`],
    styles[`Button_mode_${mode}`],
    {
      [styles.Button_stretched]: stretched,
      [styles.Button_disabled]: disabled,
    },
  );

  const onClick = (e: MouseEvent<C>) => {
    if (disabled) { return; }

    onClickProp?.(e);
  };

  return (
    <Component
      className={rootClassName}
      onClick={onClick}
      as={as as ElementType}
      {...rest}
    >
      <Typography variant="text" as="span">
        {children}
      </Typography>
    </Component>
  );
};
