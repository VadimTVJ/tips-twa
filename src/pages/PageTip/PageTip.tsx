import { useEffect } from 'react';
import { useThemeParams } from '@tma.js/sdk-react';
import { useParams } from 'react-router-dom';
import styles from './PageTip.module.scss';
import {
  Hero, Page,
} from '../../shared/ui';
import { TipForm } from '../../widgets';

export const PageTip = () => {
  const { tipId } = useParams<{ tipId?: string; }>();

  const { secondaryBackgroundColor } = useThemeParams();

  useEffect(() => {
    console.log(tipId);
  }, []);

  return (
    <Page
      className={styles.PageTip}
      backgroundColor={secondaryBackgroundColor}
      headerBackgroundColor={secondaryBackgroundColor}
      withCloseAppConfirmation
      shouldExpanded
    >
      <Hero
        icon={(
          <img
            className={styles.PageTip__heroIcon}
            src="./emoji-pen.webp"
            alt=""
          />
        )}
        heading="Официанту будет приятно"
        subheading={'Запросите у\u00A0официанта его индивидуальный код и\u00A0заполните все поля'}
      />

      <TipForm />
    </Page>
  );
};
