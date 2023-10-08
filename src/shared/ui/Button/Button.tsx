import {
  ComponentPropsWithRef, ElementRef, forwardRef, MouseEvent,
} from 'react';

import { clsx } from 'clsx';
import { useSDK } from '@tma.js/sdk-react';
import { Slot, Slottable } from '@radix-ui/react-slot';
import styles from './Button.module.scss';
import { Spinner } from '../Spinner';

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

type ButtonElement = ElementRef<'button'>;

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  size?: ButtonSize | ButtonSizeUnion;
  mode?: ButtonMode | ButtonModeUnion;
  stretched?: boolean;
  withHaptic?: boolean;
  asChild?: boolean;
  loading?: boolean;
}

export const Button = forwardRef<ButtonElement, ButtonProps>(({
  className, size = 'm', asChild, mode = 'primary', loading, stretched, children, disabled, onClick, withHaptic = false, ...rest
}, ref) => {
  const SDK = useSDK();

  const clickHandler = (e: MouseEvent<ButtonElement>) => {
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

  const rootClassName = clsx(
    className,
    styles.Button,
    styles[`Button_size_${size}`],
    styles[`Button_mode_${mode}`],
    {
      [styles.Button_stretched]: stretched,
      [styles.Button_disabled]: disabled,
      [styles.Button_loading]: loading,
    },
  );

  console.log('loading', loading);

  const Root = asChild ? Slot : 'button';
  return (
    <Root
      className={rootClassName}
      onClick={clickHandler}
      ref={ref}
      {...rest}
    >
      {loading && <Spinner className={styles.Button__spinner} />}
      <Slottable>{children}</Slottable>
    </Root>
  );
});
