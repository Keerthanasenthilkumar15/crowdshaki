"use client";
import { useContext, createContext, useState, useEffect } from "react";



const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);

  // Email/Password Sign Up
  const emailSignUp = async (email, password) => {
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  // Email/Password Sign In
  const emailSignIn = async (email, password) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const logOut = () => {
    signOut(auth);
  };

  const addUserToMongoDB = async (userData) => {
    try {
      const response = await fetch('/api/addUserDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add user to MongoDB');
      }
      console.log("User added to MongoDB successfully");
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
  //     if (currentUser) {
  //       if (!user) {
  //         const userData = {
  //           uid: currentUser.uid,
  //           email: currentUser.email,
  //           createdAt: new Date().toISOString(),
  //           lastLogin: new Date().toISOString(),
  //           authProvider: 'email',
  //           isEmailVerified: currentUser.emailVerified,
  //         };
  //         await addUserToMongoDB(userData);
  //       }
  //       setUser(currentUser);
  //     } else {
  //       setUser(null);
  //     }
      
  //     if (initialLoad) {
  //       setInitialLoad(false);
  //     }
  //   });

  //   return () => unsubscribe();
  // }, [user]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      emailSignUp, 
      emailSignIn, 
      logOut 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};