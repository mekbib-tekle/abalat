import { useState } from 'react';
import AuthProvider from './AuthProvider';
import CssThemeProvider from './theme/CssThemeProvider';
import { Auth } from './types';


function App() {
  const [authToken, setAuthToken] = useState<Auth>();
  return (
  <CssThemeProvider>
      <AuthProvider authToken={authToken} setAuthToken={setAuthToken}>
        <h3>Restricted component</h3>
      </AuthProvider>
  </CssThemeProvider>
  );
}



export default App;
