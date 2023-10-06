import { ComponentPropsWithRef } from 'react';

import { clsx } from 'clsx';
import styles from './PageTransactions.module.scss';
import {
  Hero, InfoRows, ListItem, Page, Section, Typography,
} from '../../shared/ui';
import { SectionMode } from '../../shared/ui/Section/Section';

interface PageTransactionsProps extends ComponentPropsWithRef<'div'> {}

export const PageTransactions = ({ className }: PageTransactionsProps) => {
  const rootClassName = clsx(className, styles.PageTransactions);

  return (
    <Page className={rootClassName}>
      <Hero
        icon={(
          <img
            className={styles.PageTransactions__heroIcon}
            src="./emoji-monkey.webp"
            alt=""
          />
        )}
        heading="Ваша история"
        subheading="Здесь вы сможете посмотреть всю история отправленных Вами чаевых"
      />

      <Section
        header="История моих чаевых"
        mode={SectionMode.FULL}
      >
        {[...Array(10)].map((_, i) => (
          <ListItem
            key={i}
            after={(
              <InfoRows primary="500₽" secondary="15%" />
            )}
          >
            <InfoRows
              primary={<Typography weight={500}>Макбобальдс</Typography>}
              secondary={(
                <>
                  <Typography variant="subtitle1">Иванов Петр</Typography>
                  <Typography variant="subtitle1">6 июля, 22:30</Typography>
                </>
            )}
            />
          </ListItem>
        ))}
      </Section>
    </Page>
  );
};
