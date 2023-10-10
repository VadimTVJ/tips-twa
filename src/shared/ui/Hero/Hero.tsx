import { ComponentPropsWithRef, forwardRef, ReactNode } from 'react';

import { clsx } from 'clsx';
import styles from './Hero.module.scss';
import { Typography } from '../Typography';

export interface HeroProps extends ComponentPropsWithRef<'div'> {
  heading: ReactNode;

  icon?: ReactNode;
  subheading?: ReactNode;
  filled?: boolean;
  stretched?: boolean;
}

export const Hero = forwardRef<HTMLDivElement, HeroProps>(({
  className, icon, heading, subheading, filled, children, stretched, ...rest
}, ref) => {
  const rootClassName = clsx(className, styles.Hero, {
    [styles.Hero_filled]: filled,
    [styles.Hero_stretched]: stretched,
  });

  return (
    <div className={rootClassName} ref={ref} {...rest}>
      {icon && <div className={styles.Hero__icon}>{icon}</div>}

      <Typography
        className={styles.Hero__heading}
        variant="h2"
        weight={600}
      >
        {heading}
      </Typography>

      {subheading && (
        <Typography
          variant="subtitle1"
          className={styles.Hero__subheading}
          normalize={false}
        >
          {subheading}
        </Typography>
      )}

      {children && <div className={styles.Hero__body}>{children}</div>}
    </div>
  );
});
