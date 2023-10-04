import { clsx } from 'clsx';
import { ComponentPropsWithRef, ReactNode } from 'react';
import styles from '../ListItem.module.scss';
import { Typography } from '../../Typography';

interface ListItemTextProps extends ComponentPropsWithRef<'div'> {
  primary?: ReactNode;
  secondary?: ReactNode;
}

export const ListItemText = ({
  className, primary, secondary,
}: ListItemTextProps) => {
  const rootClassName = clsx(className, styles.ListItemText);

  return (
    <div className={rootClassName}>
      {primary && (
        <Typography
          variant="text"
          weight={500}
          className={styles.ListItemText__primary}
        >
          {primary}
        </Typography>
      )}

      {secondary && (
        <Typography
          variant="subtitle1"
          className={styles.ListItemText__secondary}
        >
          {secondary}
        </Typography>
      )}
    </div>
  );
};
