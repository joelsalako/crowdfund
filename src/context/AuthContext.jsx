// Auth context for handling global state of authentication
import React, { createContext } from "react";

import { auth } from "../config";

import { useAuthState } from "react-firebase-hooks/auth";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useContext } from "react";
import { toast } from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user] = useAuthState(auth);

  // Sign in with Google for admin only
  const signInAsAdmin = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  // Sign in  with email and password for  users
  const loginWithEmailAndPassword = async ({ email, password }) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (user) {
        window.location.href = "/";
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      // check error code and display appropriate message
      if (error.code === "auth/user-not-found") {
        toast.error("Account does not exist, please register an account");
      } else if (error.code === "auth/wrong-password") {
        toast.error("You have entered an invalid password");
      } else {
        toast.error("Something went wrong, please try again");
        console.log(error);
      }
    }
  };

  // Sign up  with email and password for  users
  const registerWithEmailAndPassword = async ({ email, password }) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Account created successfully");

      // wait for 2 seconds to show alert before redirecting to home page
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      // check error code and display appropriate message
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already in use, please login");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email");
      } else if (error.code === "auth/weak-password") {
        toast.error("Password must be at least 6 characters");
      } else {
        toast.error("Something went wrong, please try again");
        console.log(error);
      }
    }
  };

  // Sign out of Google
  const signOut = async () => {
    await auth.signOut();
    window.location.href = "/";
  };

  // Context value to be passed to children
  const value = {
    user,
    signInAsAdmin,
    signOut,
    loginWithEmailAndPassword,
    registerWithEmailAndPassword,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
