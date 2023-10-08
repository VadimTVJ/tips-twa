import {
  ComponentPropsWithRef, CSSProperties, ElementType, forwardRef,
} from 'react';

import { clsx } from 'clsx';
import styles from './Typography.module.scss';

export enum TypographyVariant {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  TEXT = 'text',
  SUBTITLE1 = 'subtitle1',
  SUBTITLE2 = 'subtitle2',
}

type TypographyVariantUnion = `${TypographyVariant}`;

export interface TypographyProps extends ComponentPropsWithRef<ElementType> {
  variant?: TypographyVariant | TypographyVariantUnion;
  normalize?: boolean;
  weight?: 400 | 500 | 600;
  as?: ElementType;
}

export const Typography = forwardRef<HTMLElement, TypographyProps>(({
  className, variant = 'text', normalize = true, style, weight = 400, as: Component = 'span', ...rest
}, ref) => {
  const rootClassName = clsx(
    className,
    styles.Typography,
    styles[`Typography_variant_${variant}`],
    {
      [styles.Typography_normalized]: normalize,
    },
  );

  return (
    <Component
      className={rootClassName}
      ref={ref}
      style={{
        ...style,
        '--Typography__weight': weight,
      } as CSSProperties}
      {...rest}
    />
  );
});
