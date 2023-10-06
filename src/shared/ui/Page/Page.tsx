import { ComponentPropsWithoutRef, useEffect } from 'react';

import { clsx } from 'clsx';
import {
  useClosingBehaviour, useMainButton, useViewport, useWebApp,
} from '@tma.js/sdk-react';
import { RGB } from '@tma.js/colors';
import styles from './Page.module.scss';

interface PageProps extends ComponentPropsWithoutRef<'section'> {
  centered?: boolean;

  backgroundColor?: RGB | null;
  headerBackgroundColor?: RGB | null;
  withCloseAppConfirmation?: boolean;
  shouldExpanded?: boolean;
  withMainButton?: {
    disabled?: boolean;
    loading?: boolean;
    text?: string;
    background?: RGB | null;
    color?: RGB | null;
    action?: () => void;
  };
}

export function Page({
  className,
  centered,
  backgroundColor,
  headerBackgroundColor,
  shouldExpanded,
  withMainButton,
  withCloseAppConfirmation = false,
  ...rest
}: PageProps) {
  const webApp = useWebApp();
  const closingBehaviour = useClosingBehaviour();
  const viewport = useViewport();
  const mainButton = useMainButton();

  useEffect(() => {
    if (withMainButton?.action) {
      mainButton.on('click', withMainButton.action);

      return () => {
        mainButton.off('click', withMainButton.action);
      };
    }

    return () => {};
  }, [mainButton]);

  useEffect(() => {
    if (withMainButton) {
      if (withMainButton.disabled === false) {
        mainButton.enable();
      } else if (withMainButton.disabled === true) {
        mainButton.disable();
      }

      if (withMainButton.loading === true) {
        mainButton.showProgress();
      } else if (withMainButton.loading === false) {
        mainButton.hideProgress();
      }

      if (withMainButton.text) {
        mainButton.setText(withMainButton.text);
      }

      if (withMainButton.color) {
        mainButton.setTextColor(withMainButton.color);
      }

      if (withMainButton.background) {
        mainButton.setBackgroundColor(withMainButton.background);
      }

      mainButton.show();
    } else if (mainButton.isVisible) {
      mainButton.hide();
    }

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
