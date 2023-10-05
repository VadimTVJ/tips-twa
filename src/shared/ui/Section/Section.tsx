import { ComponentPropsWithRef } from 'react';

import { clsx } from 'clsx';
import styles from './Section.module.scss';
import { Typography } from '../Typography';

export enum SectionMode {
  FULL = 'full',
  COMPACT = 'compact',
}

type SectionModeUnion = `${SectionMode}`;

// todo сделать все компоненты polymorphic
export interface SectionProps extends ComponentPropsWithRef<'div'> {
  header?: string;
  description?: string;
  mode?: SectionMode | SectionModeUnion;
}

export const Section = ({
  className, children, header, description, mode = SectionMode.COMPACT, ...rest
}: SectionProps) => {
  const rootClassName = clsx(
    className,
    styles.Section,
    styles[`Section_mode_${mode}`],
  );

  return (
    <div
      className={rootClassName}
      {...rest}
    >
      {header && (
        <Typography
          className={styles.Section__header}
          variant="subtitle2"
        >
          {header}
        </Typography>
      )}

      <div className={styles.Section__in}>{children}</div>

      {description && (
        <Typography
          className={styles.Section__description}
          variant="subtitle2"
        >
          {description}
        </Typography>
      )}
    </div>
  );
};
