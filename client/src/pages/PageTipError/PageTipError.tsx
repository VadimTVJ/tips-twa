import { useThemeParams, useWebApp } from '@tma.js/sdk-react';
import { useNavigate } from 'react-router-dom';
import styles from './PageTipError.module.scss';
import {
  Button, Emoji, Hero, Page,
} from '../../shared/ui';

export const PageTipError = () => {
  const navigate = useNavigate();

  const webApp = useWebApp();
  const { secondaryBackgroundColor } = useThemeParams();

  return (
    <Page
      className={styles.PageTipError}
      backgroundColor={secondaryBackgroundColor}
      headerBackgroundColor={secondaryBackgroundColor}
    >
      <Hero
        icon={<Emoji size={80} emoji="❗" />}
        heading="Oops, something went wrong"
        subheading="Your payment has been rejected by the payment system"
        stretched
      />

      <div className={styles.PageTipError__footer}>
        <Button
          size="l"
          stretched
          onClick={() => navigate(-1)}
        >
          Try again
        </Button>

        <Button
          size="l"
          stretched
          mode="secondary"
          onClick={() => webApp.close()}
        >
          Close app
        </Button>
      </div>
    </Page>
  );
};
