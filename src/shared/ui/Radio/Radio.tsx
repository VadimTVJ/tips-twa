import { ComponentPropsWithoutRef, useId } from 'react';

import { clsx } from 'clsx';
import styles from './Radio.module.scss';
import { Typography } from '../Typography';
import { IconCheckbox, IconCircle } from '../../lib/icons';

export interface RadioProps extends ComponentPropsWithoutRef<'input'> {}

export const Radio = ({
  className, children, disabled, ...rest
}: RadioProps) => {
  const inputId = useId();

  const rootClassName = clsx(className, styles.Radio, {
    [styles.Radio_disabled]: disabled,
  });

  return (
    <label
      className={rootClassName}
      htmlFor={inputId}
    >
      <div className={styles.Radio__in}>
        <input
          id={inputId}
          disabled={disabled}
          {...rest}
          type="radio"
        />

        {rest.checked
          ? <IconCheckbox className={styles.Radio__icon} />
          : <IconCircle className={styles.Radio__icon} />}

        {typeof children === 'string'
          ? <Typography variant="text">{children}</Typography>
          : children}
      </div>
    </label>
  );
};
