import { ComponentPropsWithRef } from 'react';

import { clsx } from 'clsx';
import { Link } from 'react-router-dom';
import { useThemeParams } from '@tma.js/sdk-react';
import styles from './PageHome.module.scss';
import {
  Hero, InfoRows, ListItem,
  Page,
  Section,
} from '../../shared/ui';
import { IconCurrency, IconID, IconScan } from '../../shared/lib/icons';
import { ScanQRButton } from '../../features/tip/scan/ui';

interface PageHomeProps extends ComponentPropsWithRef<'div'> {}

// todo проверять, доступен ли скан куаркода, если нет, то делать listItem disabled
export function PageHome({ className }: PageHomeProps) {
  const { backgroundColor, secondaryBackgroundColor } = useThemeParams();

  const rootClassName = clsx(className, styles.PageHome);
  return (
    <Page
      className={rootClassName}
      backgroundColor={secondaryBackgroundColor}
      headerBackgroundColor={backgroundColor}
    >
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
        <ScanQRButton>
          {(openScanner, isSupported) => isSupported && (
            <ListItem
              before={<IconScan />}
              hasAction
              withHaptic
              onClick={openScanner}
            >
              <InfoRows
                primary="Отсканировать QR-код"
                secondary="Отсканируйте куракод с чека, чтобы оставить чаевые официанту"
              />
            </ListItem>
          )}
        </ScanQRButton>

        <ListItem
          before={<IconID />}
          hasAction
          withHaptic
          as={Link}
          to="tip"
        >
          <InfoRows
            primary="Ввести ID официанта вручную"
            secondary="Спросите у официанта его персональный код, чтобы оставить чаевые"
          />
        </ListItem>

        <ListItem
          before={<IconCurrency />}
          hasAction
          as={Link}
          to="/tips"
          withHaptic
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
