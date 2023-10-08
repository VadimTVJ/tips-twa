import { clsx } from 'clsx';
import styles from './TipCell.module.scss';
import {
  InfoRows, ListItem, Typography, TypographyVariant, ListItemProps, Skeleton,
} from '../../../../shared/ui';
import { Tip } from '../../model';

interface TipCellProps extends Omit<ListItemProps, 'children'> {
  tip: Tip;
}

export const TipCell = ({ className, ...rest }: TipCellProps) => {
  const rootClassName = clsx(className, styles.TipCell);

  return (
    <ListItem className={rootClassName} {...rest}>
      <ListItem.Side>
        <Typography>500 руб</Typography>
      </ListItem.Side>

      <ListItem.Body>
        <InfoRows
          primary="Бахрома"
          secondary={(
            <>
              <Typography
                variant={TypographyVariant.SUBTITLE1}
                className={styles.TipCell__waiterName}
              >
                Иванов Петр
              </Typography>

              <Typography
                variant={TypographyVariant.SUBTITLE1}
              >
                11.12.2023, 12:12
              </Typography>
            </>
        )}
        />
      </ListItem.Body>
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
