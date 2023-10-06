import { createRoot } from 'react-dom/client';

import './styles/index.scss';
import compose from 'compose-function';
import { Pages } from '../pages';
import { withRouter, withTelegram, withUIKit } from './hocks';

// todo
try {
  if (window.localStorage) {
    import('eruda')
      .then((eruda) => {
        eruda.default.init();
        eruda.default.position({ x: 10, y: 10 });
      });
  }
} catch (error) {
  console.log(error);
}

const App = compose(withTelegram, withRouter, withUIKit)(Pages);
const root = createRoot(document.getElementById('root')!);
root.render(<App />);
