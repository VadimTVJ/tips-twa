import { ComponentType, useMemo } from 'react';
import { SDKInitOptions, SDKProvider, useSDK } from '@tma.js/sdk-react';
import compose from 'compose-function';
import {
  Emoji,
  Hero, Page, Spinner, Typography, TypographyVariant,
} from '../../shared/ui';

const options: SDKInitOptions = {
  acceptScrollbarStyle: true,
  checkCompat: true,
  debug: import.meta.env.DEV,
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

  const loaderNode = (
    <Page centered>
      <Spinner />
    </Page>
  );

  const errorMessage = useMemo<null | string>(() => {
    if (!error) {
      return null;
    }

    return error instanceof Error ? error.message : 'Unknown error';
  }, [error]);

  if (!didInit) {
    return loaderNode;
  }

  if (error !== null) {
    return (
      <Page>
        <Hero
          icon={<Emoji size={80} emoji="❗" />}
          heading="SDK was unable to initialize"
          subheading={(
            <div>
              <Typography
                as="div"
                variant={TypographyVariant.SUBTITLE1}
                style={{ marginBottom: 12 }}
              >
                Probably, current application is being used not in Telegram Web Apps environment.
              </Typography>

              <code>{errorMessage}</code>
            </div>
          )}
          stretched
        />
      </Page>
    );
  }

  if (components === null) {
    return loaderNode;
  }

  return <Component />;
};

export const withTelegram = compose(
  withTelegramSDK,
  withTelegramLoader,
);
