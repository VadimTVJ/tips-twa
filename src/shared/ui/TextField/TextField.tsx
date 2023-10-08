import { clsx } from 'clsx';
import {
  ComponentPropsWithRef, ElementRef, forwardRef, ReactNode,
} from 'react';
import { Slot } from '@radix-ui/react-slot';
import styles from './TextField.module.scss';

type TextFieldElement = ElementRef<'input'>;

export interface TextFieldProps extends ComponentPropsWithRef<'input'> {
  after?: ReactNode;
  asChild?: boolean;
}

export const TextField = forwardRef<TextFieldElement, TextFieldProps>(({
  className, after, asChild, ...rest
}, ref) => {
  const Root = asChild ? Slot : 'input';
  const rootClassName = clsx(className, styles.TextField);
  return (
    <div className={rootClassName}>
      <div className={styles.TextField__in}>
        <Root ref={ref} {...rest} />

        {after && <div className={styles.TextField__after}>{after}</div>}
      </div>
    </div>
  );
});
