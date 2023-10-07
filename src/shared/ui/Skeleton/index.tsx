import { ComponentPropsWithRef } from 'react';
import { clsx } from 'clsx';
import styles from './style.module.scss';

interface SkeletonProps extends ComponentPropsWithRef<'div'> {
  rounded?: boolean;
  squared?: boolean;
}

export const Skeleton = ({
  className, rounded, style, squared, ...props
}: SkeletonProps) => {
  const rootClassName = clsx(className, styles.Skeleton, {
    [styles.Skeleton_squared]: squared,
    [styles.Skeleton_rounded]: rounded,
  });

  return (
    <div
      className={rootClassName}
      {...props}
      style={{ ...style }}
    />
  );
};
