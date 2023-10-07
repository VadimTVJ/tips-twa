import { useThemeParams } from '@tma.js/sdk-react';
import { useParams } from 'react-router-dom';
import styles from './PageTip.module.scss';
import {
  Hero, Page,
} from '../../shared/ui';
import { TipForm } from '../../widgets';
import emojiPen from '../../shared/assets/emoji-pen.webp';

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
        icon={(
          <img
            className={styles.PageTip__heroIcon}
            src={emojiPen}
            alt=""
          />
        )}
        heading="Официанту будет приятно"
        subheading={'Запросите у\u00A0официанта его индивидуальный код и\u00A0заполните все поля'}
      />

      <TipForm waiterId={Number(waiterId) || undefined} />
    </Page>
  );
};
