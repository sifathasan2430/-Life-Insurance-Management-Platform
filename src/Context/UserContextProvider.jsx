import React, { useEffect, useState } from 'react';
import UserAuthContext from './UserAuthContext';
import auth from '../Firebase/Firebase.config';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';

import axios from 'axios';

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();

  // Track auth state
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user || null);
      setLoading(false);
    });

    return () => unSubscribe();
  }, []);


   const signInUser=(email, password)=>{
  return  createUserWithEmailAndPassword(auth, email, password)
   }

  // Register with email and password
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Update Firebase profile
  const updateUserProfile = (name, photoURL) => {
    if (!auth.currentUser) return;
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  // Google Login with user existence check
const loginWithGoogle = async () => {
  return signInWithPopup(auth, provider)
};


  // Logout
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  const userData = {
    user,
    loading,
    registerUser,
    updateUserProfile,
    loginWithGoogle,
    logout,
   signInUser
  };

  return (
    <UserAuthContext.Provider value={userData}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserContextProvider;
