import { Link } from 'react-router-dom';
import { useThemeParams } from '@tma.js/sdk-react';
import styles from './PageHome.module.scss';
import {
  Emoji,
  Hero, InfoRows, ListItem,
  Page,
  Section,
} from '../../shared/ui';
import { IconCurrency, IconID, IconScan } from '../../shared/lib/icons';
import { ScanQRButton } from '../../features/tip';

export function PageHome() {
  const { backgroundColor, secondaryBackgroundColor } = useThemeParams();

  return (
    <Page
      className={styles.PageHome}
      backgroundColor={secondaryBackgroundColor}
      headerBackgroundColor={backgroundColor}
      withQuit
    >
      <Hero
        className={styles.PageHome__hero}
        filled
        icon={<Emoji size={80} emoji="🍽️" />}
        heading="Leave a tip?"
        subheading="Choose a more suitable option"
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
                  primary="Scan QR"
                  secondary="Scan the QR from the receipt to tip the waiter"
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
                primary="Enter waiter ID"
                secondary="Ask the waiter for his personalized code to leave a tip"
              />
            </ListItem.Body>
          </Link>
        </ListItem>
      </Section>

      <Section>
        <ListItem hasAction withHaptic asChild>
          <Link to="/tips">
            <ListItem.Side>
              <IconCurrency />
            </ListItem.Side>
            <ListItem.Body>
              <InfoRows
                primary="Tip History"
                secondary="History of your transfers"
              />
            </ListItem.Body>
          </Link>
        </ListItem>
      </Section>
    </Page>
  );
}
