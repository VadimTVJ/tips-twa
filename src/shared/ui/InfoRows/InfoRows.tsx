import { ComponentPropsWithRef, forwardRef, ReactNode } from 'react';

import { clsx } from 'clsx';
import { Slot } from '@radix-ui/react-slot';
import styles from './InfoRows.module.scss';
import { Typography } from '../Typography';

export interface InfoRowsProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  primary?: ReactNode;
  secondary?: ReactNode;
}

export const InfoRows = forwardRef<HTMLDivElement, InfoRowsProps>(({
  className, primary, secondary, ...rest
}, ref) => {
  const rootClassName = clsx(className, styles.InfoRows);

  const primaryCommonProps = {
    className: styles.InfoRows__primary,
    children: primary,
  };

  const renderPrimary = () => (typeof primary === 'string'
    ? <Typography variant="text" as="span" {...primaryCommonProps} />
    : <Slot {...primaryCommonProps} />);

  const secondaryCommonProps = {
    className: styles.InfoRows__secondary,
    children: secondary,
  };

  const renderSecondary = () => (typeof secondary === 'string'
    ? <Typography variant="subtitle1" as="span" {...secondaryCommonProps} />
    : <Slot {...secondaryCommonProps} />);

  return (
    <div className={rootClassName} ref={ref} {...rest}>
      {primary && renderPrimary()}
      {secondary && renderSecondary()}
    </div>
  );
});
