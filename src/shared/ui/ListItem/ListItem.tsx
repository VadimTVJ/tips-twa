import { ComponentPropsWithRef, ElementType, ReactNode } from 'react';

import { clsx } from 'clsx';
import styles from './ListItem.module.scss';
import { PolymorphicComponentProp } from '../generics';
import { Component } from '../Component';
import { ListItemText } from './parts';
import Icon from '../../../pages/PageHome/Icon.svg?react';

interface ListItemProps extends ComponentPropsWithRef<'div'> {
  before?: ReactNode;
  after?: ReactNode;
}

export const ListItem = <C extends ElementType>({
  className, children, before, after, ...rest
}: PolymorphicComponentProp<C, ListItemProps>) => {
  const hasAction = rest?.onClick || rest?.href;

  const rootClassName = clsx(className, styles.ListItem, {
    [styles.ListItem_interactive]: hasAction,
  });

  return (
    <Component
      className={rootClassName}
      {...rest}
    >
      {before && <div className={styles.ListItem__before}>{before}</div>}
      <div className={styles.ListItem__content}>
        {typeof children === 'string'
          ? <ListItemText className={styles.ListItem__content} primary={children} />
          : children}
      </div>
      {after && <div className={styles.ListItem__after}>{after}</div>}

      {hasAction && <Icon className={styles.ListItem__arrow} />}
    </Component>
  );
};

ListItem.Text = ListItemText;
