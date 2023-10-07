import { useNavigate } from 'react-router-dom';
import styles from './PageTipResult.module.scss';
import { Button, Hero, Page } from '../../shared/ui';

export const PageTipResult = () => {
  const navigate = useNavigate();

  // todo hideBack button if success, show if error

  return (
    <Page className={styles.PageTipResult}>
      <Hero
        icon={(
          <img
            className={styles.PageTipResult__heroIcon}
            src="./emoji-success.webp"
            alt=""
          />
        )}
        heading="Официанту уже приятно!"
        subheading="Вы оставили чаевые официанту, спасибо!"
        stretched
      />

      <div className={styles.PageTipResult__footer}>
        <Button
          size="l"
          stretched
          mode="secondary"
          onClick={() => navigate(-1)}
        >
          Попробовать еще раз
        </Button>
        <Button
          size="l"
          stretched
          mode="secondary"
          onClick={() => navigate(-1)}
        >
          Попробовать еще раз
        </Button>
      </div>
    </Page>
  );
};
