import { ComponentPropsWithRef } from 'react';
import { clsx } from 'clsx';
import styles from '../ListItem.module.scss';

export const ListItemBody = ({ className, ...rest }: ComponentPropsWithRef<'div'>) => {
  const rootClassName = clsx(className, styles.ListItemBody);

  return (
    <div className={rootClassName} {...rest} />
  );
};
