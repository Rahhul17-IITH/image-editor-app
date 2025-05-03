import React, { createContext, useContext, useEffect, useState } from "react";
import {
  signIn as amplifySignIn,
  signOut as amplifySignOut,
  getCurrentUser,
  fetchAuthSession
} from "aws-amplify/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [jwtToken, setJwtToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, check if user is signed in
  useEffect(() => {
    getCurrentUser()
      .then(async (user) => {
        setUser(user);
        const session = await fetchAuthSession();
        setJwtToken(session.tokens?.idToken?.toString() || null);
      })
      .catch(() => {
        setUser(null);
        setJwtToken(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // Sign in function
  const signIn = async (username, password) => {
    const { isSignedIn } = await amplifySignIn({ username, password });
    if (isSignedIn) {
      const user = await getCurrentUser();
      setUser(user);
      const session = await fetchAuthSession();
      setJwtToken(session.tokens?.idToken?.toString() || null);
      return user;
    }
    throw new Error("Sign in failed");
  };

  // Sign out function
  const signOut = async () => {
    await amplifySignOut();
    setUser(null);
    setJwtToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, jwtToken, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

// //for dev purpose
// import React, { createContext, useContext } from "react";

// // Create the context
// const AuthContext = createContext();

// // Mock AuthProvider for development
// export function AuthProvider({ children }) {
//   // Mock user data
//   const user = { username: "demo_user" };
//   const jwtToken = "mock_token";
//   const loading = false;

//   // Mock signIn and signOut do nothing
//   const signIn = async () => {};
//   const signOut = async () => {};

//   return (
//     <AuthContext.Provider value={{ user, jwtToken, signIn, signOut, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// // Custom hook for consuming the context
// export function useAuth() {
//   return useContext(AuthContext);
// }

