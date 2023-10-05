import { ComponentPropsWithoutRef } from 'react';

import { clsx } from 'clsx';
import styles from './Spinner.module.scss';
import { IconSpinner } from '../../lib/icons';

export interface SpinnerProps extends ComponentPropsWithoutRef<'div'> {}

export const Spinner = ({ className = '', ...rest }: SpinnerProps) => {
  const rootClassName = clsx(className, styles.Spinner);

  return (
    <span
      role="status"
      className={rootClassName}
      {...rest}
    >
      <IconSpinner className={styles.Spinner__icon} />
    </span>
  );
};
