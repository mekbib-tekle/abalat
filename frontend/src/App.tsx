import { useState } from 'react';
import Login from './Login';
import CssThemeProvider from './theme/CssThemeProvider';
import { Auth } from './types';


function App() {
  const [authToken, setAuthToken] = useState<Auth>();

  console.log(authToken);
  return (
  <CssThemeProvider>
      <Login setAuthToken={setAuthToken}/>
  </CssThemeProvider>
  );
}



export default App;
