import ThemeConfig from './theme';
import Router from './routes';

import ScrollToTop from './components/ScrollToTop';
 import NotistackProvider from './components/NotistackProvider';
import ThemePrimaryColor from './components/ThemePrimaryColor';
import { AuthUserProvider } from './context/authUser.context';
import { useEffect } from 'react';
import Settings from './layouts/dashboard/settings';
import useSettings from './hooks/useSettings';


function App() {
  const {printDocRef} = useSettings()
  useEffect(() => {
    const handlePopstate = () => {
      window.location.reload();
    };

    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);
  return (
    <div ref={printDocRef}>
    <ThemeConfig>
      <ThemePrimaryColor>
        <NotistackProvider>
        <AuthUserProvider>
         
        <ScrollToTop />
            <Router />
            </AuthUserProvider>
        </NotistackProvider>
      </ThemePrimaryColor>
    </ThemeConfig>

    </div>
  )
}

export default App
