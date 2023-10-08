import { useWebApp } from '@tma.js/sdk-react';
import { useNavigate } from 'react-router-dom';
import styles from './PageTipError.module.scss';
import { Button, Hero, Page } from '../../shared/ui';
import emojiError from '../../shared/assets/emoji-time.webp';

export const PageTipError = () => {
  const navigate = useNavigate();

  const webApp = useWebApp();

  return (
    <Page className={styles.PageTipError}>
      <Hero
        icon={(
          <img
            className={styles.PageTipError__heroIcon}
            src={emojiError}
            alt=""
          />
        )}
        heading="Кажется, что-то не так"
        subheading="Давайте повторим попытку? Кажется, операция не заврешилась"
        stretched
      />

      <div className={styles.PageTipError__footer}>
        <Button
          size="l"
          stretched
          onClick={() => navigate(-1)}
        >
          Повторить попытку
        </Button>

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
