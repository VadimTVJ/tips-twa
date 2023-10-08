import { clsx } from 'clsx';
import { ReactNode } from 'react';
import styles from './WaiterCell.module.scss';
import { InfoRows, ListItem, ListItemProps } from '../../../../shared/ui';
import { Waiter } from '../../model';

interface WaiterCellProps extends Omit<ListItemProps, 'children'> {
  after?: ReactNode;
  waiter: Waiter;
}

export const WaiterCell = ({
  className, waiter: { name, photo, restaurant }, after, ...rest
}: WaiterCellProps) => {
  const rootClassName = clsx(className, styles.WaiterCell);

  // todo ...rest always as last
  return (
    <ListItem className={rootClassName} {...rest}>
      <ListItem.Side>
        <div
          style={{ backgroundImage: `url${photo}` }}
          className={styles.WaiterCell__avatar}
        />
      </ListItem.Side>

      <ListItem.Body>
        <InfoRows
          primary={name}
          secondary={restaurant}
        />
      </ListItem.Body>

      {after && (
        <ListItem.Side side="right">{after}</ListItem.Side>
      )}
    </ListItem>
  );
};
