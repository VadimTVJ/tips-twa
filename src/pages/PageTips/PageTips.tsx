import { useThemeParams } from '@tma.js/sdk-react';
import styles from './PageTips.module.scss';
import {
  Button, ButtonMode, Hero, Page, Section, SectionMode,
} from '../../shared/ui';
import { useTipsQuery } from '../../entities/tip/api';
import { TipCell } from '../../entities/tip/ui';
import emojiMonkey from '../../shared/assets/emoji-monkey.webp';

// todo font family refactor
export const PageTips = () => {
  const { secondaryBackgroundColor } = useThemeParams();
  const {
    tips, isTipsError, isTipsLoading, hasTips, fetchTips,
  } = useTipsQuery();

  const tipsNode = !isTipsError && !isTipsLoading && tips?.map((tip) => (
    <TipCell key={tip.id} tip={tip} />
  ));

  const tipsSkeleton = isTipsLoading && [...Array(5).keys()].map((key) => (
    <TipCell.Skeleton key={key} />
  ));

  const heroNode = hasTips && (
    <Hero
      icon={(
        <img
          className={styles.PageTips__heroIcon}
          src={emojiMonkey}
          alt=""
        />
        )}
      heading="Ваша история"
      subheading="Здесь вы&nbsp;сможете посмотреть всю история отправленных Вами чаевых"
    />
  );

  const errorHeroNode = isTipsError && (
    <Hero
      icon={(
        <img
          className={styles.PageTips__heroIcon}
          src={emojiMonkey}
          alt=""
        />
        )}
      heading="Error"
      subheading="Error msg"
      stretched
    >
      <Button
        mode={ButtonMode.SECONDARY}
        onClick={() => fetchTips()}
      >
        Повторить попытку
      </Button>
    </Hero>
  );

  const emptyHeroNode = !isTipsError && !hasTips && (
    <Hero
      icon={(
        <img
          className={styles.PageTips__heroIcon}
          src={emojiMonkey}
          alt=""
        />
        )}
      heading="Empty"
      subheading="Emptry msg"
      stretched
    />
  );

  return (
    <Page
      className={styles.PageTips}
      backgroundColor={secondaryBackgroundColor}
      headerBackgroundColor={secondaryBackgroundColor}
      shouldExpanded
    >
      {errorHeroNode}
      {emptyHeroNode}
      {heroNode}

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
