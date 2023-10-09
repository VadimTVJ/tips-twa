import { useThemeParams } from '@tma.js/sdk-react';
import styles from './PageTips.module.scss';
import {
  Button, ButtonMode, Emoji, Hero, Page, Section, SectionMode,
} from '../../shared/ui';
import { useTipsQuery } from '../../entities/tip/api';
import { TipCell } from '../../entities/tip/ui';

export const PageTips = () => {
  const { secondaryBackgroundColor } = useThemeParams();

  const {
    tips, isTipsError, isTipsLoading, hasTips, fetchTips,
  } = useTipsQuery();

  const tipsNode = !isTipsError && hasTips && tips?.map((tip) => (
    <TipCell key={tip.id} tip={tip} />
  ));

  const tipsSkeleton = !isTipsError && isTipsLoading
    && [...Array(5).keys()].map((key) => (
      <TipCell.Skeleton key={key} />
    ));

  const heroNode = (hasTips || isTipsLoading) && (
    <Hero
      icon={<Emoji size={80} emoji="🧾" />}
      heading="Tip History"
      subheading="Here you can see the history of tips you have left"
    />
  );

  const errorHeroNode = isTipsError && (
    <Hero
      icon={<Emoji size={80} emoji="❗" />}
      heading="Oops, something went wrong"
      subheading="There was an error loading the tip history"
      stretched
    >
      <Button
        mode={ButtonMode.SECONDARY}
        onClick={() => fetchTips()}
      >
        Try again
      </Button>
    </Hero>
  );

  const emptyHeroNode = !isTipsError && !isTipsLoading && !hasTips && (
    <Hero
      icon={<Emoji size={80} emoji="🧾" />}
      heading="It's empty!"
      subheading="Here you can see the history of tips you have left"
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

      {!isTipsError && (hasTips || isTipsLoading) && (
        <Section
          mode={SectionMode.FULL}
          header="History"
        >
          {tipsNode}
          {tipsSkeleton}
        </Section>
      )}
    </Page>
  );
};
