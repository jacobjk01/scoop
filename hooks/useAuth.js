import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from '../api/auth';
import { getUser } from '../api/users';
import { localState } from '../config/initialState';
export const useAuth = () => {
  /**
   * Authentication
   */
  //userAuth is a object with the field uid
  const [userAuth, setUserAuth] = useState(null);
  //user is a object with the user document data
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState(localState.currentMode);
  const [guideDone, setGuideDone] = useState(localState.guideDone);
  const [visitorDone, setVisitorDone] = useState(localState.visitorDone);
  const [visitorBone, setVisitorBone] = useState(localState.visitorBone);
  const [bookTourInfo, setBookTourInfo] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const hasNotFinishedBareOnboarding =
    (mode === 'new' ||
      (mode === 'visitor' && !visitorBone) ||
      (mode === 'guide' && !guideDone)) &&
    mode !== 'dev';

  useEffect(() => {
    console.log(mode);
    if (hasNotFinishedBareOnboarding) {
      return;
    }
    var unsubscribeAuth = onAuthStateChanged(async newUserAuth => {
      //if userAuth exists,
      if (newUserAuth && userAuth == null) {
        // userAuth is null, so definitely unique
        setUserAuth(newUserAuth);
        // userAuth exists and doesn't match with with newUserAuth.uid
      } else if (
        userAuth &&
        userAuth.uid &&
        newUserAuth &&
        userAuth.uid != newUserAuth.uid
      ) {
        setUserAuth(newUserAuth);
      }
      if (isUserLoading) {
        setIsUserLoading(false);
      }
    });
    return () => {
      unsubscribeAuth();
    };
  }, [hasNotFinishedBareOnboarding]);

  useEffect(async () => {
    if (hasNotFinishedBareOnboarding) {
      return;
    }
    if (userAuth) {
      const currentUser = await getUser(userAuth);
      setUser({ ...currentUser.data() });
    }
  }, [userAuth]);

  return {
    userAuth,
    setUserAuth,
    user,
    setUser,
    bookTourInfo,
    setBookTourInfo,
    mode,
    setMode,
    guideDone,
    setGuideDone,
    visitorDone,
    setVisitorDone,
    visitorBone,
    setVisitorBone,
    isUserLoading,
    setIsUserLoading,
    hasNotFinishedBareOnboarding
  }
}