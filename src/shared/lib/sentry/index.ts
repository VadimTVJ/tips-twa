/* eslint-disable no-param-reassign */

import * as Sentry from '@sentry/react';

export const startSentry = (initialHash = window.location.hash) => {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY,
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    beforeSend: (event) => {
      const { request } = event;
      if (!request?.url) { return event; }

      // Remove #hash from request
      const url = new URL(request.url);
      url.hash = '';

      event.request = {
        ...event.request,
        url: url.toString(),
      };

      // Add sentry context with useful information, without sensitive (e.g. hash, auth_date)
      const tgContext: Record<string, string> = {};
      const hashParams = new URLSearchParams(initialHash.slice(1));
      hashParams.forEach((value, key) => {
        if (key === 'tgWebAppThemeParams') { return; }

        if (key === 'tgWebAppData') {
          const tgWebAppData = new URLSearchParams(value);

          tgWebAppData.forEach((appDataValue, appDataKey) => {
            const allowedFields = ['can_send_after', 'start_param', 'user'];

            if (allowedFields.includes(appDataKey)) {
              if (appDataKey === 'user') {
                try {
                  const user = JSON.parse(appDataValue);
                  tgContext.user_id = user.id;
                } catch (error) {
                  // ignore
                }
              } else {
                tgContext[appDataKey] = appDataValue;
              }
            }
          });
        } else {
          tgContext[key] = value;
        }
      });

      event.contexts = {
        ...event.contexts,
        Params: tgContext,
      };

      return event;
    },
  });
};
