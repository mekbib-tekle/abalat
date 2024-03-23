import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from './AuthProvider';
import CssThemeProvider from './theme/CssThemeProvider';
import { Auth } from './types';
import Home from './components/Home';
import Ministries from './components/Ministries';
import NotFound from './components/NotFound';
import AppBar from './components/AppBar';




function App() {
  const [authToken, setAuthToken] = useState<Auth>();
  return (
        <CssThemeProvider>
          <AuthProvider authToken={authToken} setAuthToken={setAuthToken}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<AppBar />}>
                  <Route index element={<Home />} />
                  <Route path="ministries" element={<Ministries />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </CssThemeProvider>

  );
}



export default App;
