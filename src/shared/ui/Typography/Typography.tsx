import { CSSProperties, ElementType } from 'react';

import { clsx } from 'clsx';
import styles from './Typography.module.scss';
import { Component } from '../Component';
import { PolymorphicComponentProp } from '../generics';

export enum TypographyVariant {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  TEXT = 'text',
  SUBTITLE1 = 'subtitle1',
  SUBTITLE2 = 'subtitle2',
}

type TypographyVariantUnion = `${TypographyVariant}`;

const componentMapping: Record<string, ElementType> = {
  [TypographyVariant.H1]: 'h1',
  [TypographyVariant.H2]: 'h2',
  [TypographyVariant.H3]: 'h3',
  [TypographyVariant.TEXT]: 'p',
  [TypographyVariant.SUBTITLE1]: 'h4',
  [TypographyVariant.SUBTITLE2]: 'h4',
};

export type TypographyProps<C extends ElementType> = PolymorphicComponentProp<C, {
  variant?: TypographyVariant | TypographyVariantUnion;
  normalize?: boolean;
  weight?: 400 | 500 | 600;
}>;

export const Typography = <C extends ElementType>({
  className, variant = 'text', normalize = true, style, weight = 400, as, ...rest
}: TypographyProps<C>) => {
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
      as={as || componentMapping[variant]}
      style={{
        ...style,
        '--Typography__weight': weight,
      } as CSSProperties}
      {...rest}
    />
  );
};
