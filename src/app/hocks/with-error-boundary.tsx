import { ComponentType } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { Emoji, Hero } from '../../shared/ui';

const fallbackRender = ({ error }: FallbackProps) => {
  return (
    <Hero
      icon={<Emoji size={80} emoji="❗" />}
      stretched
      heading="Something went wrong"
      subheading={<pre>{error.message}</pre>}
    />
  );
};

export const withErrorBoundary = (Component: ComponentType) => () => (
  <ErrorBoundary fallbackRender={fallbackRender}>
    <Component />
  </ErrorBoundary>
);
