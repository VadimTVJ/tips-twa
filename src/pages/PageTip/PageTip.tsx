import { ComponentPropsWithRef } from 'react';

import { clsx } from 'clsx';
import styles from './PageTip.module.scss';
import { Page } from '../../shared/ui';

interface PageTipProps extends ComponentPropsWithRef<'div'> {}

export function PageTip({ className }: PageTipProps) {
  const rootClassName = clsx(className, styles.PageTip);
  return (
    <Page className={rootClassName}>
      <div style={{ width: 200, height: 200, background: 'ghostwhite' }} />
      <br />
      <div style={{ width: 200, height: 200, background: 'ghostwhite' }} />
      <br />
      <div style={{ width: 200, height: 200, background: 'ghostwhite' }} />
    </Page>
  );
}
