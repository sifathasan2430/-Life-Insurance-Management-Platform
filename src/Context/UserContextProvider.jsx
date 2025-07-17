import React, { useEffect, useState } from 'react';
import UserAuthContext from './UserAuthContext';
import auth from '../Firebase/Firebase.config';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import secureAxios from '../utils/firebaseAxios';



const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();
  const [userRole, setUserRole] = useState(null);


  // Track auth state
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async(user) => {
      setUser(user || null);

        

  if (user?.email) {
        try {
          const res = await secureAxios.get(`/users?email=${user.email}`);

          setUserRole(res.data?.role || null);
        } catch (err) {
          console.error("Failed to fetch role:", err);
          setUserRole(null);
        }
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });
    

    return () => unSubscribe();
  }, []);


   const signInUser=(email, password)=>{
  return  signInWithEmailAndPassword(auth, email, password);
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
   signInUser,
   userRole,
  };

  return (
    <UserAuthContext.Provider value={userData}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserContextProvider;
