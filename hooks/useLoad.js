import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from '../api/auth';
import { getUser } from '../api/users';
import { localState } from '../config/initialState';
export const useLoad = () => {
  const [loaded, setLoaded] = useState(false);
  return {
    loaded,
    setLoaded
  } 
}