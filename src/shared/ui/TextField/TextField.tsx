import { clsx } from 'clsx';
import { ReactNode } from 'react';
import styles from './TextField.module.scss';
import { PolymorphicComponentProp } from '../generics';
import { Component } from '../Component';

type AllowedElementTypes = 'input' | 'textarea';

export type TextFieldProps<C extends AllowedElementTypes> = PolymorphicComponentProp<C, {
  after?: ReactNode;
}>;

export const TextField = <C extends AllowedElementTypes = 'input'>({
  className, as = 'input' as C, after, disabled, ...rest
}: TextFieldProps<C>) => {
  const rootClassName = clsx(
    className,
    styles.TextField,
    styles[`TextField_as_${as}`],
    {
      [styles.TextField_disabled]: disabled,
    },
  );

  const fieldClassName = clsx(
    styles.TextField__field,
    styles[`TextField_as_${as}`],
  );

  return (
    <div className={rootClassName}>
      <div className={styles.TextField__in}>
        <Component
          className={fieldClassName}
          as={as as AllowedElementTypes}
          rows={5}
          disabled={disabled}
          {...rest}
        />

        {after && <div className={styles.TextField__after}>{after}</div>}
      </div>
    </div>
  );
};
