import { ComponentType, useMemo } from 'react';
import {
  SDKProvider, SDKInitOptions, useSDK,
} from '@tma.js/sdk-react';
import compose from 'compose-function';

const options: SDKInitOptions = {
  acceptScrollbarStyle: true,
  checkCompat: true,
  debug: false,
  cssVars: true,
};

const withTelegramSDK = (Component: ComponentType) => () => {
  return (
    <SDKProvider initOptions={options}>
      <Component />
    </SDKProvider>
  );
};

const withTelegramLoader = (Component: ComponentType) => () => {
  const { didInit, components, error } = useSDK();

  const errorMessage = useMemo<null | string>(() => {
    if (!error) {
      return null;
    }

    return error instanceof Error ? error.message : 'Unknown error';
  }, [error]);

  // todo
  if (!didInit) {
    return <div>SDK init function is not yet called.</div>;
  }

  if (error !== null) {
    return (
      <>
        <p>
          SDK was unable to initialize. Probably, current application is being used
          not in Telegram Web Apps environment.
        </p>
        <blockquote>
          <p>{errorMessage}</p>
        </blockquote>
      </>
    );
  }

  if (components === null) {
    return <div>Loading..</div>;
  }

  return <Component />;
};

export const withTelegram = compose(
  withTelegramSDK,
  withTelegramLoader,
);
