import { ComponentPropsWithoutRef } from 'react';
import { clsx } from 'clsx';
import styles from '../ListItem.module.scss';

export interface ListItemSideProps extends ComponentPropsWithoutRef<'div'> {
  side?: 'left' | 'right';
}

export const ListItemSide = ({ className, side = 'left', ...rest }: ListItemSideProps) => {
  const rootClassName = clsx(
    className,
    styles.ListItemSide,
    styles[`ListItemSide_side_${side}`],
  );

  return (
    <div className={rootClassName} {...rest} />
  );
};
