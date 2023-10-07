import { useThemeParams } from '@tma.js/sdk-react';
import styles from './PageTips.module.scss';
import {
  Hero, Page, Section,
  SectionMode,
} from '../../shared/ui';
import { useTipsQuery } from '../../entities/tip/api';
import { TipCell } from '../../entities/tip/ui';

export const PageTips = () => {
  const { secondaryBackgroundColor } = useThemeParams();
  const {
    tips, isTipsError, isTipsLoading, hasTips,
  } = useTipsQuery();

  const tipsNode = !isTipsError && !isTipsLoading && tips?.map((tip) => (
    <TipCell key={tip.id} tip={tip} />
  ));

  const tipsSkeleton = isTipsLoading && [...Array(5).keys()].map((key) => (
    <TipCell.Skeleton key={key} />
  ));

  return (
    <Page
      className={styles.PageTips}
      backgroundColor={secondaryBackgroundColor}
      headerBackgroundColor={secondaryBackgroundColor}
      shouldExpanded
    >
      <Hero
        icon={(
          <img
            className={styles.PageTips__heroIcon}
            src="./emoji-monkey.webp"
            alt=""
          />
        )}
        heading={hasTips
          ? 'Ваша история'
          : 'История пуста'}
        subheading={hasTips
          ? 'Здесь вы&nbsp;сможете посмотреть всю история отправленных Вами чаевых'
          : 'text'}
        stretched={!hasTips}
      />

      {hasTips && (
        <Section
          mode={SectionMode.FULL}
          header="История чаевых"
        >
          {tipsNode}
          {tipsSkeleton}
        </Section>
      )}
    </Page>
  );
};
