import {
  ComponentPropsWithRef,
  ElementRef,
  forwardRef, MouseEvent,
} from 'react';

import { clsx } from 'clsx';
import { useSDK } from '@tma.js/sdk-react';
import { Slot } from '@radix-ui/react-slot';
import styles from './ListItem.module.scss';
import { ListItemBody, ListItemSide } from './parts';

type ListItemElement = ElementRef<'button'>;

export interface ListItemProps extends ComponentPropsWithRef<'button'> {
  disabled?: boolean;
  hasAction?: boolean;
  asChild?: boolean;
  withHaptic?: boolean;
}

const ListItem = forwardRef<ListItemElement, ListItemProps>(({
  className,
  asChild,
  disabled,
  onClick,
  hasAction,
  children,
  withHaptic = false,
  ...rest
}, ref) => {
  const SDK = useSDK();

  const clickHandler = (e: MouseEvent<ListItemElement>) => {
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

  const rootClassName = clsx(className, styles.ListItem, {
    [styles.ListItem_interactive]: hasAction,
    [styles.ListItem_disabled]: disabled,
  });

  const Root = asChild ? Slot : 'button';
  return (
    <Root
      className={rootClassName}
      onClick={clickHandler}
      ref={ref}
      {...rest}
    >
      {children}
    </Root>
  );
});

const ListItemNamespace = Object.assign({}, ListItem, {
  Body: ListItemBody,
  Side: ListItemSide,
});

export { ListItemNamespace as ListItem };
