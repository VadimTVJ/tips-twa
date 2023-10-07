import { clsx } from 'clsx';
import styles from './WaiterCell.module.scss';
import { InfoRows, ListItem, ListItemProps } from '../../../../shared/ui';
import { Waiter } from '../../model';

interface WaiterCellProps extends Omit<ListItemProps, 'children'> {
  waiter: Waiter;
}

export const WaiterCell = ({
  className, waiter: { name, photo, restaurant }, ...rest
}: WaiterCellProps) => {
  const rootClassName = clsx(className, styles.WaiterCell);

  return (
    <ListItem
      className={rootClassName}
      before={(
        <div
          style={{ backgroundImage: `url${photo}` }}
          className={styles.WaiterCell__avatar}
        />
      )}
      {...rest} // todo rest always as last
    >
      <InfoRows
        primary={name}
        secondary={restaurant}
      />
    </ListItem>
  );
};
