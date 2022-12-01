import React, { createContext, FunctionComponent, useContext, useEffect, useState } from 'react';
import { auth, ACCESS_TOKEN, REFRESH_TOKEN } from 'data';

const AuthContext = createContext<any>(null);
const LoginContext = createContext<any>(null);

// TODO: use a reducer to set the access token and trigger updates

export const AuthProvider: FunctionComponent = ({ children }) => {
  const [isLoading, setLoading] = useState<boolean>(true);

  // TODO: define user object state
  const [user, setUser] = useState<any>(undefined);

  const loadUserProfile = async () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    let userFromSession = undefined;

    if (accessToken) {
      try {
        const response: any = await auth.me();
        userFromSession = response?.data;
      } catch (error) {
        console.log(error);
      }
    }

    setUser(userFromSession);
    setLoading(false);
  }

  useEffect(() => {
    loadUserProfile();
  }, []);

  const handleLogin = async ({ email, password }: { email: string, password: string }) => {
    const loginPayload = { email, password };
    const response = await auth.login(loginPayload);
    const { data, headers }: any = response;

    localStorage.setItem(REFRESH_TOKEN, headers['refresh-token']);
    localStorage.setItem(ACCESS_TOKEN, headers['access-token']);

    if (data?.status === "success") {
      loadUserProfile();
    } else {
      setUser(undefined);
      setLoading(false);
    }
  }

  const handleLogout = async () => {

  }

  return (
    <AuthContext.Provider value={{ isLoading, user, reload: loadUserProfile }}>
      <LoginContext.Provider value={{ login: handleLogin, logout: handleLogout }}>
        <>
          {children}
        </>
      </LoginContext.Provider>
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export const useLogin = () => {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error('useLogin must be used within an AuthProvider');
  }
  return context;
}
