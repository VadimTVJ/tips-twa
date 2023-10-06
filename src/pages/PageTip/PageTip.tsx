import { ComponentPropsWithRef } from 'react';

import { clsx } from 'clsx';
import { useThemeParams } from '@tma.js/sdk-react';
import styles from './PageTip.module.scss';
import {
  Hero, Page, Radio, Section, SegmentedControl, TextField,
} from '../../shared/ui';

interface PageTipProps extends ComponentPropsWithRef<'div'> {}

export const PageTip = ({ className }: PageTipProps) => {
  const { secondaryBackgroundColor } = useThemeParams();

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

      <Section
        header="Официант"
      >
        <TextField
          value="Иван Иванов"
        />
      </Section>

      <Section header="Чаевые">
        <Radio checked>Фиксированная сумма</Radio>
        <Radio>Процент от покупки</Radio>
      </Section>

      <Section
        header="Сумма чека, ₽"
      >
        <TextField
          disabled
          value="3000"
        />
      </Section>

      <Section
        header="Процент от суммы"
      >
        <SegmentedControl
          items={[
            { label: '10%', value: '10' },
            { label: '15%', value: '15' },
            { label: '20%', value: '20' },
            { label: '30%', value: '30' },
          ]}
        />
      </Section>

      <Section
        header="Процент от суммы"
      >
        <SegmentedControl
          items={[
            { label: '10%', value: '10' },
            { label: '15%', value: '15' },
            { label: '20%', value: '20' },
            { label: '30%', value: '30' },
          ]}
        />
      </Section>

      <Section
        header="Процент от суммы"
      >
        <SegmentedControl
          items={[
            { label: '10%', value: '10' },
            { label: '15%', value: '15' },
            { label: '20%', value: '20' },
            { label: '30%', value: '30' },
          ]}
        />
      </Section>
    </Page>
  );
};
