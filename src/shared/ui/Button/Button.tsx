import { ComponentPropsWithRef, MouseEvent } from 'react';

import { clsx } from 'clsx';
import styles from './Button.module.scss';
import { Typography } from '../Typography';

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

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  size?: ButtonSize | ButtonSizeUnion;
  mode?: ButtonMode | ButtonModeUnion;
  stretched?: boolean;
}

export const Button = ({
  className, size = 'm', mode = 'primary', stretched, children, disabled, onClick: onClickProp, ...rest
}: ButtonProps) => {
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

  // todo проверить онклик у всех интерактивных элементов
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) { return; }

    onClickProp?.(e);
  };

  // todo тут надо через as
  return (
    <button
      type="button"
      className={rootClassName}
      onClick={onClick}
      {...rest}
    >
      <Typography
        variant="text"
        as="span"
      >
        {children}
      </Typography>
    </button>
  );
};
