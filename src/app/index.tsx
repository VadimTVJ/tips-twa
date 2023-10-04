import { createRoot } from 'react-dom/client';

import './styles/index.scss';
import { Pages } from '../pages';
import { withRouter } from './hocks';

const App = withRouter(Pages);
const root = createRoot(document.getElementById('root')!);
root.render(<App />);
