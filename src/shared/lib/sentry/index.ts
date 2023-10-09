import * as Sentry from '@sentry/react';

export const startSentry = (initialHash = window.location.hash) => {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY,
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    beforeSend: (event) => {
    // todo remove sensitive data
    // todo add context

      console.log('====', initialHash);

      return event;
    },
  });
};
