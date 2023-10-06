import { ComponentPropsWithoutRef, useEffect } from 'react';

import { clsx } from 'clsx';
import { useClosingBehaviour, useViewport, useWebApp } from '@tma.js/sdk-react';
import { RGB } from '@tma.js/colors';
import styles from './Page.module.scss';

interface PageProps extends ComponentPropsWithoutRef<'section'> {
  centered?: boolean;

  backgroundColor?: RGB | null;
  headerBackgroundColor?: RGB | null;
  withCloseAppConfirmation?: boolean;
  shouldExpanded?: boolean;
}

export function Page({
  className,
  centered,
  backgroundColor,
  headerBackgroundColor,
  shouldExpanded,
  withCloseAppConfirmation = false,
  ...rest
}: PageProps) {
  const webApp = useWebApp();
  const closingBehaviour = useClosingBehaviour();
  const viewport = useViewport();

  useEffect(() => {
    if (backgroundColor && webApp.supports('setBackgroundColor')) {
      webApp.setBackgroundColor(backgroundColor);
    }
    if (headerBackgroundColor && webApp.supports('setHeaderColor')) {
      webApp.setHeaderColor(headerBackgroundColor);
    }

    if (withCloseAppConfirmation) {
      closingBehaviour.enableConfirmation();
    } else {
      closingBehaviour.disableConfirmation();
    }

    console.log('shouldExpanded', shouldExpanded);
    if (shouldExpanded && !viewport.isExpanded) {
      viewport.expand();
    }
  }, []);

  const rootClassName = clsx(className, styles.Page);
  return (
    <section
      className={rootClassName}
      {...rest}
    />
  );
}
