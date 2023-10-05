import { ComponentPropsWithRef, ReactNode } from 'react';

import { clsx } from 'clsx';
import styles from './InfoRows.module.scss';
import { Typography } from '../Typography';

export interface InfoRowsProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  primary?: ReactNode;
  secondary?: ReactNode;
}

export const InfoRows = ({
  className, primary, secondary, ...rest
}: InfoRowsProps) => {
  const rootClassName = clsx(className, styles.InfoRows);

  // todo у всех ui компонентов добавить {...rest}
  return (
    <div className={rootClassName} {...rest}>
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
};
