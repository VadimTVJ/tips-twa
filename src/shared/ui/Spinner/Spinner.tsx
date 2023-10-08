import { ComponentPropsWithRef, forwardRef } from 'react';

import { clsx } from 'clsx';
import styles from './Spinner.module.scss';
import { IconSpinner } from '../../lib/icons';

export interface SpinnerProps extends Omit<ComponentPropsWithRef<'span'>, 'children'> {}

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(({
  className = '', ...rest
}, ref) => {
  const rootClassName = clsx(className, styles.Spinner);

  return (
    <span
      role="status"
      className={rootClassName}
      ref={ref}
      {...rest}
    >
      <IconSpinner className={styles.Spinner__icon} />
    </span>
  );
});
