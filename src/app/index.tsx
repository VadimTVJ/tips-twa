import { createRoot } from 'react-dom/client';

import './styles/index.scss';
import compose from 'compose-function';
import { Pages } from '../pages';
import {
  withQuery, withRouter, withTelegram, withUIKit,
} from './hocks';

try {
  if (import.meta.env.DEV && window.localStorage) {
    import('eruda')
      .then((eruda) => {
        eruda.default.init();
        eruda.default.position({ x: 10, y: 10 });
      });
  }
} catch (error) {
  console.error('[Eruda]', error);
}

const App = compose(withUIKit, withTelegram, withRouter, withQuery)(Pages);
const root = createRoot(document.getElementById('root')!);
root.render(<App />);
