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

      // Remove #hash from event
      const url = new URL(request.url);
      url.hash = '';

      event.request = {
        ...event.request,
        url: url.toString(),
      };

      // Add sentry context with useful information, without sensitive (e.g. hash, auth_date)
      const hashParams = new URLSearchParams(initialHash.slice(1));
      const tgContext: Record<string, string> = {};
      hashParams.forEach((value, key) => {
        if (key === 'tgWebAppThemeParams') { return; }

        if (key === 'tgWebAppData') {
          const initData = new URLSearchParams(value);

          initData.forEach((initDataValue, initDataKey) => {
            const allowedFields = ['can_send_after', 'start_param', 'user'];

            if (allowedFields.includes(initDataKey)) {
              if (initDataKey === 'user') {
                try {
                  const user = JSON.parse(initDataValue);
                  tgContext.user_id = user.id;
                } catch (error) {
                  // skip
                }
              } else {
                tgContext[initDataKey] = initDataValue;
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
