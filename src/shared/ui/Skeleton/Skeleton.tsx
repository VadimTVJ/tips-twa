import { ComponentPropsWithRef, forwardRef } from 'react';
import { clsx } from 'clsx';
import styles from './style.module.scss';

export const Skeleton = forwardRef<HTMLDivElement, Omit<ComponentPropsWithRef<'div'>, 'children'>>(({
  className, ...props
}, ref) => {
  const rootClassName = clsx(className, styles.Skeleton);

  return (
    <div
      className={rootClassName}
      ref={ref}
      {...props}
    />
  );
});
