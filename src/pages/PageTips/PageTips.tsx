import { ComponentPropsWithRef } from 'react';

import { clsx } from 'clsx';
import styles from './PageTips.module.scss';
import { Hero } from '../../shared/ui';

interface PageTipsProps extends ComponentPropsWithRef<'div'> {}

export const PageTips = ({ className, ...rest }: PageTipsProps) => {
  const rootClassName = clsx(className, styles.PageTips);

  return (
    <div className={rootClassName} {...rest}>
      <Hero
        heading="123213"
        subheading="fgergre"
      />
    </div>
  );
};
