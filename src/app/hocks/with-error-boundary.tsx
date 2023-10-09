import { ComponentType } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { Hero } from '../../shared/ui';
import emojiMonkey from '../../shared/assets/emoji-monkey.webp';

const fallbackRender = ({ error }: FallbackProps) => {
  return (
    <Hero
      icon={(
        <img
          src={emojiMonkey}
          alt=""
          style={{ width: 112, height: 112 }}
        />
      )}
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
