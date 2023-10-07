import { ElementType, MouseEvent } from 'react';

import { clsx } from 'clsx';
import { useSDK } from '@tma.js/sdk-react';
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
  TERTIARY = 'tertiary',
}

type ButtonModeUnion = `${ButtonMode}`;

export type ButtonProps<C extends ElementType> = PolymorphicComponentProp<C, {
  size?: ButtonSize | ButtonSizeUnion;
  mode?: ButtonMode | ButtonModeUnion;
  stretched?: boolean;
  withHaptic?: boolean;
}>;

export const Button = <C extends ElementType = 'button'>({
  className, size = 'm', mode = 'primary', stretched, children, disabled, onClick, as = 'button' as C, withHaptic = false, ...rest
}: ButtonProps<C>) => {
  const SDK = useSDK();

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

  const clickHandler = (e: MouseEvent<C>) => {
    if (disabled) { return; }
    onClick?.(e);

    if (
      SDK.didInit
      && SDK.components
      && SDK.components.haptic.supports('impactOccurred')
      && withHaptic) {
      SDK.components.haptic.impactOccurred('light');
    }
  };

  return (
    <Component
      className={rootClassName}
      onClick={clickHandler}
      as={as as ElementType}
      {...rest}
    >
      <Typography variant="text" as="span" weight={500}>
        {children}
      </Typography>
    </Component>
  );
};
