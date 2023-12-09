import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [cart, setCart] = useState([]);
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    // Log the result data when it changes
    console.log('Result data changed:', resultData);
  }, [resultData]);

  function signInContext(token, userName) {
    setUser(userName);
    setToken(token);
    console.log('User signed in. Token:', token);
    // Do not log resultData here as it might not have been updated yet.
  }

  function signOutContext() {
    setUser(null);
    setToken(null);
    setCart([]);
    setResultData(null);
    console.log('User signed out. Token cleared.');
  }

  const value = {
    user,
    token,
    cart,
    resultData,
    isUserLoggedIn: !!user,
    signInContext,
    signOutContext,
    updateCart: setCart,
    updateResultData: setResultData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
