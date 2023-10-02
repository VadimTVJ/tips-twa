import { ComponentPropsWithRef } from 'react';

import { clsx } from 'clsx';
import styles from './PageTip.module.scss';

interface PageTipProps extends ComponentPropsWithRef<'div'> {}

export function PageTip({ className }: PageTipProps) {
  const rootClassName = clsx(className, styles.PageTip);
  return (
    <div className={rootClassName}>
      123213213gggg
    </div>
  );
}
