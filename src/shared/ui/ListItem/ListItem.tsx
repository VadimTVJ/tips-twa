import {
  ElementType, MouseEvent, ReactNode,
} from 'react';

import { clsx } from 'clsx';
import { useSDK } from '@tma.js/sdk-react';
import styles from './ListItem.module.scss';
import { PolymorphicComponentProp } from '../generics';
import { Component } from '../Component';
import { InfoRows } from '../InfoRows';
import { IconChevronRight } from '../../lib/icons';

export type ListItemProps<C extends ElementType> = PolymorphicComponentProp<C, {
  before?: ReactNode;
  after?: ReactNode;
  disabled?: boolean;
  hasAction?: boolean;
  withHaptic?: boolean;
}>;

export const ListItem = <C extends ElementType>({
  className, children, before, after, disabled, onClick, hasAction, withHaptic = false, ...rest
}: ListItemProps<C>) => {
  const SDK = useSDK();

  const rootClassName = clsx(className, styles.ListItem, {
    [styles.ListItem_interactive]: hasAction,
    [styles.ListItem_disabled]: disabled,
  });

  const clickHandler = (e: MouseEvent<C>) => {
    if (disabled) { return; }
    onClick?.(e);

    if (
      SDK.didInit
      && SDK.components
      && SDK.components.haptic.supports('impactOccurred')
      && withHaptic) {
      SDK.components.haptic.impactOccurred('light');
    }
  };

  return (
    <Component
      className={rootClassName}
      onClick={clickHandler}
      {...rest}
    >
      {before && <div className={styles.ListItem__before}>{before}</div>}

      <div className={styles.ListItem__content}>
        {typeof children === 'string'
          ? <InfoRows className={styles.ListItem__content} primary={children} />
          : children}
      </div>

      {after && <div className={styles.ListItem__after}>{after}</div>}

      {hasAction && <IconChevronRight className={styles.ListItem__arrow} />}
    </Component>
  );
};
