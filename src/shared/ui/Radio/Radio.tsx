import { ChangeEvent, ComponentPropsWithoutRef, useId } from 'react';

import { clsx } from 'clsx';
import { useSDK } from '@tma.js/sdk-react';
import styles from './Radio.module.scss';
import { Typography } from '../Typography';
import { IconCheckbox, IconCircle } from '../../lib/icons';

export interface RadioProps extends ComponentPropsWithoutRef<'input'> {
  withHaptic?: boolean;
}

export const Radio = ({
  className, children, disabled, onChange, withHaptic = true, ...rest
}: RadioProps) => {
  const inputId = useId();
  const SDK = useSDK();

  const rootClassName = clsx(className, styles.Radio, {
    [styles.Radio_disabled]: disabled,
  });

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);

    if (
      SDK.didInit
      && SDK.components
      && SDK.components.haptic.supports('selectionChanged')
      && withHaptic) {
      SDK.components.haptic.selectionChanged();
    }
  };

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
          onChange={changeHandler}
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
