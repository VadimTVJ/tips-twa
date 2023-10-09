import { useThemeParams, useWebApp } from '@tma.js/sdk-react';
import styles from './PageTipSuccess.module.scss';
import {
  Button, Emoji, Hero, Page,
} from '../../shared/ui';

export const PageTipSuccess = () => {
  const webApp = useWebApp();

  const { secondaryBackgroundColor } = useThemeParams();

  return (
    <Page
      className={styles.PageTipSuccess}
      backgroundColor={secondaryBackgroundColor}
      headerBackgroundColor={secondaryBackgroundColor}
      withQuit
    >
      <Hero
        icon={<Emoji size={80} emoji="🎉" />}
        heading="Success!"
        subheading="Tip successfully sent to the waiter, thank you!"
        stretched
      />

      <div className={styles.PageTipSuccess__footer}>
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
