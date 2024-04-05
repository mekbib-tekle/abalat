import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from './AuthProvider';
import CssThemeProvider from './theme/CssThemeProvider';
import { Auth } from './types';
import Home from './components/Home';
import Ministries from './components/Ministries';
import NotFound from './components/NotFound';
import NavBar from './components/NavBar';
import FollowUp from './components/FollowUp';

function App() {
  const [authToken, setAuthToken] = useState<Auth>();
  return (
        <CssThemeProvider>
          <AuthProvider authToken={authToken} setAuthToken={setAuthToken}>
            <BrowserRouter>
              <NavBar />
              <Routes>
                <Route index element={<Home />} />
                <Route path="follow-up" element={<FollowUp />} />
                <Route path="ministries" element={<Ministries />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </CssThemeProvider>

  );
}

export default App;
