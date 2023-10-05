import { ComponentPropsWithRef } from 'react';

import { clsx } from 'clsx';
import styles from './PageTipResult.module.scss';
import { Button, Hero, Page } from '../../shared/ui';

interface PageTipResultProps extends ComponentPropsWithRef<'div'> {}

export const PageTipResult = ({ className }: PageTipResultProps) => {
  const rootClassName = clsx(className, styles.PageTipResult);

  return (
    <Page className={rootClassName}>
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
        >
          Попробовать еще раз
        </Button>
      </div>
    </Page>
  );
};
