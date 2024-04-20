import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from './AuthProvider';
import CssThemeProvider from './theme/CssThemeProvider';
import { Auth } from './types';
import Home from './components/Home';
import Members from './components/Members';
import NotFound from './components/NotFound';
import NavBar from './components/NavBar';
import FollowUp from './components/FollowUp';
import { Provider as FetchProvider } from 'use-http';
import Profile from './components/Profile';
import Admin from './components/Admin';

function App() {
  const [authToken, setAuthToken] = useState<Auth>();
  return (
        <CssThemeProvider>
          <FetchProvider>
          <AuthProvider authToken={authToken} setAuthToken={setAuthToken}>
            <BrowserRouter>
              <NavBar />
              <Routes>
                <Route index element={<Home />} />
                <Route path="follow-up" element={<FollowUp />} />
                <Route path="profile" element={<Profile />} />
                <Route path="members" element={<Members />} />
                <Route path="admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
          </FetchProvider>
        </CssThemeProvider>

  );
}

export default App;
