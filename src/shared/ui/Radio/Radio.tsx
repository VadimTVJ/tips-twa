import { ComponentPropsWithRef, useId } from 'react';

import { clsx } from 'clsx';
import styles from './Radio.module.scss';
import { Typography } from '../Typography';
import { IconCheckbox, IconCircle } from '../../lib/icons';

export interface RadioProps extends ComponentPropsWithRef<'input'> {}

// todo перепроверить порядок rest, чтобы не затирались нужные пропы
/**
 * # The Radio component
 * Shows a button
 */
export const Radio = ({ className, children, ...rest }: RadioProps) => {
  const inputId = useId();

  const rootClassName = clsx(className, styles.Radio); // todo добавить ховер

  return (
    <label
      className={rootClassName}
      htmlFor={inputId}
    >
      <input
        id={inputId}
        type="radio"
        {...rest}
      />

      {rest.checked
        ? <IconCheckbox className={styles.Radio__icon} />
        : <IconCircle className={styles.Radio__icon} />}

      {typeof children === 'string'
        ? <Typography variant="text">{children}</Typography>
        : children}
    </label>
  );
};
