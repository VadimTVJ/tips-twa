import {
  Route, Routes, useLocation,
} from 'react-router-dom';
import { PageHome } from './PageHome';
import { PageTip } from './PageTip';

export const Pages = () => {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route path="/" element={<PageHome />} />
      <Route path="/tip" element={<PageTip />} />
    </Routes>
  );
};
