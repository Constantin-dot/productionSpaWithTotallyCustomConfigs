import './styles/index.scss';
import { Suspense } from "react";
import { Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { AboutPageAsync } from "./pages/AboutPage/AboutPage.async";
import { MainPageAsync } from "./pages/MainPage/MainPage.async";
import { useTheme } from './theme/useTheme';

const App = () => {
  const { theme, themeToggle } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <button onClick={themeToggle}>Change theme from: {theme}</button>
      <Link to={'/'}>Main</Link>
      <Link to={'/about'}>About</Link>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={'/about'} element={<AboutPageAsync />} />
          <Route path={'/'} element={<MainPageAsync />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;