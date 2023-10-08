import { useWebApp } from '@tma.js/sdk-react';
import styles from './PageTipSuccess.module.scss';
import { Button, Hero, Page } from '../../shared/ui';
import emojiSuccess from '../../shared/assets/emoji-success.webp';

export const PageTipSuccess = () => {
  const webApp = useWebApp();

  return (
    <Page className={styles.PageTipSuccess}>
      <Hero
        icon={(
          <img
            className={styles.PageTipSuccess__heroIcon}
            src={emojiSuccess}
            alt=""
          />
        )}
        heading="Официанту уже приятно!"
        subheading="Вы оставили чаевые официанту, спасибо!"
        stretched
      />

      <div className={styles.PageTipSuccess__footer}>
        <Button
          size="l"
          stretched
          mode="secondary"
          onClick={() => webApp.close()}
        >
          Закрыть приложение
        </Button>
      </div>
    </Page>
  );
};
