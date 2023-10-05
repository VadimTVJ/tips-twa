import { createRoot } from 'react-dom/client';

import './styles/index.scss';
import compose from 'compose-function';
import { Pages } from '../pages';
import { withRouter, withUIKit } from './hocks';

const App = compose(withRouter, withUIKit)(Pages);
const root = createRoot(document.getElementById('root')!);
root.render(<App />);
