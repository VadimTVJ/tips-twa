import { ComponentPropsWithRef } from 'react';

import { clsx } from 'clsx';
import { Link } from 'react-router-dom';
import styles from './PageHome.module.scss';

interface PageHomeProps extends ComponentPropsWithRef<'div'> {}

export function PageHome({ className }: PageHomeProps) {
  const rootClassName = clsx(className, styles.PageHome);
  return (
    <div className={rootClassName}>
      123213213
      <Link to="/tip">go</Link>
    </div>
  );
}
