import { Link } from 'react-router-dom';
import { useThemeParams } from '@tma.js/sdk-react';
import styles from './PageHome.module.scss';
import {
  Hero, InfoRows, ListItem,
  Page,
  Section,
} from '../../shared/ui';
import { IconCurrency, IconID, IconScan } from '../../shared/lib/icons';
import { ScanQRButton } from '../../features/tip';
import emojiMoney from '../../shared/assets/emoji-money.webp';

export function PageHome() {
  const { backgroundColor, secondaryBackgroundColor } = useThemeParams();

  return (
    <Page
      className={styles.PageHome}
      backgroundColor={secondaryBackgroundColor}
      headerBackgroundColor={backgroundColor}
    >
      <Hero
        className={styles.PageHome__hero}
        filled
        icon={(
          <img
            className={styles.PageHome__heroIcon}
            src={emojiMoney}
            alt="Telegram web app tips"
          />
        )}
        heading="Отправим чаевые?"
        subheading={'Выберите более подходящий\u00A0вариант'}
      />

      <Section>
        <ScanQRButton>
          {(openScanner, isSupported) => isSupported && (
            <ListItem hasAction withHaptic onClick={openScanner}>
              <ListItem.Side>
                <IconScan />
              </ListItem.Side>
              <ListItem.Body>
                <InfoRows
                  primary="Отсканировать QR-код"
                  secondary="Отсканируйте куракод с чека, чтобы оставить чаевые официанту"
                />
              </ListItem.Body>
            </ListItem>
          )}
        </ScanQRButton>

        <ListItem hasAction withHaptic asChild>
          <Link to="/tip">
            <ListItem.Side>
              <IconID />
            </ListItem.Side>
            <ListItem.Body>
              <InfoRows
                primary="Ввести ID официанта вручную"
                secondary="Спросите у официанта его персональный код, чтобы оставить чаевые"
              />
            </ListItem.Body>
          </Link>
        </ListItem>

        <ListItem hasAction withHaptic asChild>
          <Link to="/tips">
            <ListItem.Side>
              <IconCurrency />
            </ListItem.Side>
            <ListItem.Body>
              <InfoRows
                primary="История чаевых"
                secondary="История Ваших переводов"
              />
            </ListItem.Body>
          </Link>
        </ListItem>
      </Section>
    </Page>
  );
}
