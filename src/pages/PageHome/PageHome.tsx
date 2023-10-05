import { ComponentPropsWithRef } from 'react';

import { clsx } from 'clsx';
import { Link } from 'react-router-dom';
import styles from './PageHome.module.scss';
import {
  Hero, InfoRows, ListItem,
  Page,
  Section,
} from '../../shared/ui';
import { IconCurrency, IconID, IconScan } from '../../shared/lib/icons';

interface PageHomeProps extends ComponentPropsWithRef<'div'> {}

// todo проверять, доступен ли скан куаркода, если нет, то делать listItem disabled
export function PageHome({ className }: PageHomeProps) {
  const rootClassName = clsx(className, styles.PageHome);

  return (
    <Page className={rootClassName}>
      <Hero
        className={styles.PageHome__hero}
        filled
        icon={(
          <img
            className={styles.PageHome__heroIcon}
            src="./emoji-money.webp"
            alt="Telegram web app tips"
          />
        )}
        heading="Отправим чаевые?"
        subheading={'Выберите более подходящий\u00A0вариант'}
      />

      <Section>
        <ListItem
          before={<IconScan />}
          as={Link}
          to="tip"
          hasAction
        >
          <InfoRows
            primary="Отсканировать QR-код"
            secondary="Отсканируйте куракод с чека, чтобы оставить чаевые официанту"
          />
        </ListItem>

        <ListItem
          before={<IconID />}
          hasAction
        >
          <InfoRows
            primary="Ввести ID официанта вручную"
            secondary="Спросите у официанта его персональный код, чтобы оставить чаевые"
          />
        </ListItem>

        <ListItem
          before={<IconCurrency />}
          hasAction
        >
          <InfoRows
            primary="История чаевых"
            secondary="История Ваших переводов"
          />
        </ListItem>
      </Section>
    </Page>
  );
}
