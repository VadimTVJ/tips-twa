import { ComponentPropsWithRef } from 'react';

import { clsx } from 'clsx';
import styles from './Page.module.scss';

interface PageProps extends ComponentPropsWithRef<'section'> {
  centered?: boolean;
}

export function Page({ className, centered, ...rest }: PageProps) {
  const rootClassName = clsx(className, styles.Page);

  return (
    <section
      className={rootClassName}
      {...rest}
    />
  );
}
