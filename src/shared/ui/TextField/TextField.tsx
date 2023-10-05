import { clsx } from 'clsx';
import { ReactNode } from 'react';
import styles from './TextField.module.scss';
import { PolymorphicComponentProp } from '../generics';
import { Component } from '../Component';

type AllowedElementTypes = 'input' | 'textarea';

interface TextFieldProps {
  after?: ReactNode;
}

export const TextField = <C extends AllowedElementTypes = 'input'>({
  className, as = 'input' as C, after, ...rest
}: PolymorphicComponentProp<C, TextFieldProps>) => {
  const rootClassName = clsx(
    className,
    styles.TextField,
    styles[`TextField_as_${as}`],
  );

  const fieldClassName = clsx(
    styles.TextField__field,
    styles[`TextField_as_${as}`],
  );

  return (
    <div className={rootClassName}>
      <Component
        className={fieldClassName}
        as={as as AllowedElementTypes}
        rows={5}
        {...rest}
      />

      {after && <div className={styles.TextField__after}>{after}</div>}
    </div>
  );
};
