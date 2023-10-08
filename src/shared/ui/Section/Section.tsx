import { ComponentPropsWithRef, forwardRef, ReactNode } from 'react';

import { clsx } from 'clsx';
import styles from './Section.module.scss';
import { Typography } from '../Typography';

export enum SectionMode {
  FULL = 'full',
  COMPACT = 'compact',
}

type SectionModeUnion = `${SectionMode}`;

export interface SectionProps extends ComponentPropsWithRef<'div'> {
  header?: ReactNode;
  description?: ReactNode;
  mode?: SectionMode | SectionModeUnion;
}

export const Section = forwardRef<HTMLDivElement, SectionProps>(({
  className, children, header, description, mode = SectionMode.COMPACT, ...rest
}, ref) => {
  const rootClassName = clsx(
    className,
    styles.Section,
    styles[`Section_mode_${mode}`],
  );

  return (
    <div className={rootClassName} ref={ref} {...rest}>
      {header && (
        <Typography
          className={styles.Section__header}
          variant="subtitle2"
          as="div"
        >
          {header}
        </Typography>
      )}

      <div className={styles.Section__in}>{children}</div>

      {description && (
        <Typography
          className={styles.Section__description}
          variant="subtitle2"
          as="div"
        >
          {description}
        </Typography>
      )}
    </div>
  );
});
