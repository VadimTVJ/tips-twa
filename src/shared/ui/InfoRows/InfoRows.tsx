import { ComponentPropsWithRef, forwardRef, ReactNode } from 'react';

import { clsx } from 'clsx';
import styles from './InfoRows.module.scss';
import { Typography } from '../Typography';

export interface InfoRowsProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  primary?: ReactNode;
  secondary?: ReactNode;
}

export const InfoRows = forwardRef<HTMLDivElement, InfoRowsProps>(({
  className, primary, secondary, ...rest
}, ref) => {
  const rootClassName = clsx(className, styles.InfoRows);

  return (
    <div className={rootClassName} ref={ref} {...rest}>
      {primary && (
        <Typography
          variant="text"
          weight={500}
          className={styles.InfoRows__primary}
          as="span"
        >
          {primary}
        </Typography>
      )}

      {secondary && (
        <Typography
          variant="subtitle1"
          className={styles.InfoRows__secondary}
          as="span"
        >
          {secondary}
        </Typography>
      )}
    </div>
  );
});
