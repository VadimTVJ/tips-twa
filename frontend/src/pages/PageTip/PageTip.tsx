import { ComponentPropsWithRef, useEffect } from 'react';

import { clsx } from 'clsx';
import { useThemeParams } from '@tma.js/sdk-react';
import { useParams } from 'react-router-dom';
import styles from './PageTip.module.scss';
import {
  Hero, Page,
} from '../../shared/ui';
import { TipForm } from '../../widgets';

interface PageTipProps extends ComponentPropsWithRef<'div'> {}

export const PageTip = ({ className }: PageTipProps) => {
  const { tipId } = useParams<{ tipId?: string; }>();

  const { secondaryBackgroundColor } = useThemeParams();

  useEffect(() => {
    console.log(tipId);
  }, []);

  const rootClassName = clsx(className, styles.PageTip);
  return (
    <Page
      className={rootClassName}
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
