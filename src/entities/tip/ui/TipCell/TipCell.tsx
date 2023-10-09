import { clsx } from 'clsx';
import dayjs from 'dayjs';
import styles from './TipCell.module.scss';
import {
  InfoRows, ListItem, Typography, TypographyVariant, ListItemProps, Skeleton,
} from '../../../../shared/ui';
import { Tip } from '../../model';
import { buildAmountWithCurrency } from '../../../../shared/config';

interface TipCellProps extends Omit<ListItemProps, 'children'> {
  tip: Tip;
}

export const TipCell = ({
  className, tip: {
    create_date: date, amount, currency, waiter: { name, restaurant },
  }, ...rest
}: TipCellProps) => {
  const rootClassName = clsx(className, styles.TipCell);

  return (
    <ListItem className={rootClassName} {...rest}>
      <ListItem.Body>
        <InfoRows
          primary={restaurant}
          secondary={(
            <div className={styles.TipCell__details}>
              <Typography
                variant={TypographyVariant.SUBTITLE1}
                className={styles.TipCell__waiterName}
              >
                {name}
              </Typography>

              <Typography
                variant={TypographyVariant.SUBTITLE1}
              >
                {dayjs(date).format('D MMM, HH:mm')}
              </Typography>
            </div>
        )}
        />
      </ListItem.Body>

      <ListItem.Side side="right">
        <Typography>{buildAmountWithCurrency(amount, currency)}</Typography>
      </ListItem.Side>
    </ListItem>
  );
};

TipCell.Skeleton = (props: ListItemProps) => {
  return (
    <ListItem {...props}>
      <ListItem.Side>
        <Skeleton style={{ height: 18, width: 40 }} />
      </ListItem.Side>

      <ListItem.Body>
        <InfoRows
          primary={(
            <Skeleton
              style={{
                height: 18, width: 120, marginTop: 3, marginBottom: 3,
              }}
            />
            )}
          secondary={(
            <>
              <Skeleton
                style={{
                  height: 14, width: 100, marginTop: 2, marginBottom: 2,
                }}
              />
              <Skeleton
                style={{
                  height: 14, width: 80, marginTop: 2, marginBottom: 2,
                }}
              />
            </>
        )}
        />
      </ListItem.Body>
    </ListItem>
  );
};
