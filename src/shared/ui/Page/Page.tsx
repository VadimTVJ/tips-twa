import { ComponentPropsWithRef, useEffect } from 'react';

import { clsx } from 'clsx';
import { useSDK } from '@tma.js/sdk-react';
import { RGB } from '@tma.js/colors';
import styles from './Page.module.scss';

export interface PageProps extends ComponentPropsWithRef<'section'> {
  centered?: boolean;

  backgroundColor?: RGB | null;
  headerBackgroundColor?: RGB | null;
  withCloseAppConfirmation?: boolean;
  shouldExpanded?: boolean;
  withQuit?: boolean;
}

export function Page({
  className,
  centered,
  backgroundColor,
  headerBackgroundColor,
  shouldExpanded,
  withQuit = false,
  withCloseAppConfirmation = false,
  ...rest
}: PageProps) {
  const SDK = useSDK();

  const { didInit } = SDK;

  const webApp = didInit && SDK.components?.webApp;
  const closingBehaviour = didInit && SDK.components?.closingBehavior;
  const viewport = didInit && SDK.components?.viewport;
  const backButton = didInit && SDK.components?.backButton;

  useEffect(() => {
    if (backgroundColor && webApp && webApp.supports('setBackgroundColor')) {
      webApp.setBackgroundColor(backgroundColor);
    }
    if (headerBackgroundColor && webApp && webApp.supports('setHeaderColor')) {
      webApp.setHeaderColor(headerBackgroundColor);
    }

    if (withCloseAppConfirmation && closingBehaviour) {
      closingBehaviour.enableConfirmation();
    } else if (closingBehaviour) {
      closingBehaviour.disableConfirmation();
    }

    if (shouldExpanded && viewport && !viewport.isExpanded) {
      viewport.expand();
    }

    if (withQuit) {
      if (backButton && backButton.isVisible && backButton.supports('hide')) {
        backButton.hide();
      }
    } else if (backButton && !backButton.isVisible && backButton.supports('show')) {
      backButton.show();
    }
  }, []);

  const rootClassName = clsx(className, styles.Page, {
    [styles.Page_centered]: centered,
  });

  return (
    <section className={rootClassName} {...rest} />
  );
}
