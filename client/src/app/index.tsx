import { createRoot } from 'react-dom/client';

import './styles/index.scss';
import compose from 'compose-function';
import { Pages } from '../pages';
import {
  withErrorBoundary,
  withQuery, withRouter, withTelegram, withUIKit,
} from './hocks';
import { startSentry } from '../shared/lib/sentry';
import { startEruda } from '../shared/lib/eduda';

if (import.meta.env.MODE === 'production') { startSentry(); }
if (import.meta.env.MODE === 'development') { startEruda(); }

const App = compose(withUIKit, withErrorBoundary, withTelegram, withRouter, withQuery)(Pages);
const root = createRoot(document.getElementById('root')!);
root.render(<App />);
