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
export const Radio = ({
  className, children, disabled, ...rest
}: RadioProps) => {
  const inputId = useId();

  const rootClassName = clsx(className, styles.Radio, {
    [styles.Radio_disabled]: disabled,
  }); // todo добавить ховер

  return (
    <label
      className={rootClassName}
      htmlFor={inputId}
    >
      <div className={styles.Radio__in}>
        <input
          id={inputId}
          type="radio"
          disabled={disabled}
          {...rest}
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
