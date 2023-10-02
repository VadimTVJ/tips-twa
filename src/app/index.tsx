import { createRoot } from 'react-dom/client';

import './styles/index.scss';
import { Pages } from '../pages';

const App = Pages;
const root = createRoot(document.getElementById('root')!);
root.render(<App />);
