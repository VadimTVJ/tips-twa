import { ComponentPropsWithoutRef, ReactNode } from 'react';

import { clsx } from 'clsx';
import styles from './Hero.module.scss';
import { Typography } from '../Typography';

export interface HeroProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  heading: ReactNode;

  icon?: ReactNode;
  subheading?: ReactNode;
  filled?: boolean;
  stretched?: boolean;
}

export const Hero = ({
  className, icon, heading, subheading, filled, stretched, ...rest
}: HeroProps) => {
  const rootClassName = clsx(className, styles.Hero, {
    [styles.Hero_filled]: filled,
    [styles.Hero_stretched]: stretched,
  });

  return (
    <div
      className={rootClassName}
      {...rest}
    >
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
    </div>
  );
};
