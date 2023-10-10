import { useThemeParams } from '@tma.js/sdk-react';
import { useParams } from 'react-router-dom';
import styles from './PageTip.module.scss';
import {
  Emoji,
  Hero, Page,
} from '../../shared/ui';
import { TipForm } from '../../widgets';

export const PageTip = () => {
  const { waiterId } = useParams<{ waiterId?: string; }>();

  const { secondaryBackgroundColor } = useThemeParams();

  return (
    <Page
      className={styles.PageTip}
      backgroundColor={secondaryBackgroundColor}
      headerBackgroundColor={secondaryBackgroundColor}
      withCloseAppConfirmation
      shouldExpanded
    >
      <Hero
        icon={<Emoji size={80} emoji="💸" />}
        heading="The waiter will be pleased"
        subheading={waiterId
          ? ''
          : 'Ask the waiter for his individual code and\u00A0fill\u00A0out\u00A0all\u00A0fields'}
      />

      <TipForm waiterId={Number(waiterId) || undefined} />
    </Page>
  );
};
