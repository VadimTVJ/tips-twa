import { ComponentPropsWithRef, forwardRef } from 'react';
import { clsx } from 'clsx';
import styles from './style.module.scss';

export interface SkeletonProps extends ComponentPropsWithRef<'div'> {
  rounded?: boolean;
  squared?: boolean;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(({
  className, rounded, style, squared, ...props
}, ref) => {
  const rootClassName = clsx(className, styles.Skeleton, {
    [styles.Skeleton_squared]: squared,
    [styles.Skeleton_rounded]: rounded,
  });

  return (
    <div
      className={rootClassName}
      ref={ref}
      {...props}
      style={{ ...style }}
    />
  );
});
